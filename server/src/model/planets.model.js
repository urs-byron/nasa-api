const fs = require("node:fs");
const path = require("node:path");
const { parse: csv_parse } = require("csv-parse");
require("express-async-errors");
const { planetModel } = require("./planets.mongo");
const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

async function loadHabitablePlanets() {
  const file = path.resolve(__dirname, "kepler_data.csv");

  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) {
        console.log("File does not exist.");
        reject();
      } else {
        if (!stat.isDirectory()) {
          fs.createReadStream(file)
            .pipe(csv_parse({ comment: "#", columns: true }))
            .on("data", (data) => {
              if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
                planetModel
                  .updateOne(
                    { kepler_name: data.kepler_name },
                    { kepler_name: data.kepler_name },
                    { upsert: true }
                  )
                  .catch((err) => console.log(err));
              }
            })
            .on("error", (err) => {
              console.log(err);
              reject();
            })
            .on("end", () => resolve());
        } else {
          console.log("File does not exist.");
          reject();
        }
      }
    });
  });
}

module.exports = { loadHabitablePlanets, habitablePlanets };
