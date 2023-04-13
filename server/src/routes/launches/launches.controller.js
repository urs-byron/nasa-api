const {
  getLaunches,
  addLaunch,
  abortLaunch,
} = require("../../model/launch.model");

async function httpGetLaunches(req, res) {
  getLaunches(req.query)
    .then((data) => {
      return res.status(200).json([...data]);
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ error_type: 404, error_msg: "Item not Found" });
    });
}
async function httpPutLaunch(req, res) {
  if (
    req.body.mission.length > 0 &&
    req.body.rocket.length > 0 &&
    req.body.target.length > 0 &&
    req.body.launchDate.length > 0 &&
    !isNaN(new Date(req.body.launchDate))
  ) {
    await addLaunch(req.body);
    return res.status(201).json(req.body);
  } else {
    return res.status(400).json({ error_type: 400, error_msg: "Bad Request" });
  }
}
async function httpDeleteLaunch(req, res) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error_type: 400, error_msg: "Bad Request" });
  }
  abortLaunch(req.params.id)
    .then((data) => {
      if (data) {
        return res.status(200).json(data);
      } else {
        return res
          .status(404)
          .json({ error_type: 404, error_msg: "Item not Found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(404)
        .json({ error_type: 500, error_msg: "Server Error" });
    });
}
module.exports = { httpGetLaunches, httpPutLaunch, httpDeleteLaunch };
