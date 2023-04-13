const axios = require("axios");
const mongoose = require("mongoose");
require("express-async-errors");

const { getPageSkip } = require("../util/query");
const { launchModel, latestLaunchFlightNumModel } = require("./launch.mongo");

async function getLatesFlightNumber() {
  const fNum = await launchModel.findOne().sort("-flightNumber");

  if (fNum) {
    return fNum.flightNumber;
  } else {
    return 0;
  }
}

async function getLaunches(query) {
  const { page, limit, skip } = getPageSkip(query);
  return await launchModel.find({}, "-_id -__v").skip(skip).limit(limit);
}
async function addLaunch(new_launch) {
  let new_fn = await getLatesFlightNumber();
  new_fn++;
  launchModel
    .create({
      flightNumber: new_fn,
      mission: new_launch.mission,
      rocket: new_launch.rocket,
      launchDate: new Date(new_launch.launchDate),
      target: new_launch.target,
      customers: ["NASA", "ZTM"],
      upcoming: true,
      success: true,
    })
    .catch((err) => console.log(err));
}
async function abortLaunch(id) {
  return await launchModel.findOneAndUpdate(
    {
      flightNumber: id,
      upcoming: true,
    },
    {
      upcoming: false,
      success: false,
    },
    { upsert: true }
  );
}

async function loadLaunches() {
  const SPACE_X_API = "https://api.spacexdata.com/v4/launches/query";
  const spaceX_launches = (
    await axios.post(SPACE_X_API, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    })
  ).data.docs;

  if (
    !(await launchModel.exists({
      flightNumber: 1,
      mission: "FalconSat",
    }))
  ) {
    for (let launch of spaceX_launches) {
      const customers = launch["payloads"].flatMap(
        (payload) => payload["customers"]
      );

      let space_x_launch = {
        flightNumber: launch.flight_number,
        mission: launch.name,
        rocket: launch.rocket.name,
        launchDate: new Date(launch.date_local),
        target: null,
        customers,
        upcoming: launch.upcoming,
        success: launch.success,
      };

      await launchModel.create(space_x_launch);
    }
  }
}
async function deleteLaunches() {
  await launchModel.deleteMany();
}

module.exports = {
  getLaunches,
  addLaunch,
  abortLaunch,
  loadLaunches,
  deleteLaunches,
};
