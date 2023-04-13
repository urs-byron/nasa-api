// MODELS
const { planetModel } = require("../../model/planets.mongo");

async function getPlanets(req, res) {
  let planets;
  planetModel
    .find({}, "kepler_name -_id")
    .then((data) => {
      planets = data;
      return res.status(200).json(planets);
    })
    .catch((err) => {
      // console.log(err);
      return res.status(400).json({});
    });
}

module.exports = { getPlanets };
