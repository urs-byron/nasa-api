const express = require("express");

const apiV1 = express.Router();

const { planetsRouter } = require("../planets/planets.router");
const { launchesRouter } = require("../launches/launches.router");

// ROUTERS
// ROUTER - PLANETS
apiV1.use("/planets", planetsRouter);
// ROUTER - LAUNCHES
apiV1.use("/launches", launchesRouter);

module.exports = { apiV1 };
