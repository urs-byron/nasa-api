const express = require("express");
const body_parser = require("body-parser");

const {
  httpGetLaunches,
  httpPutLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

// MIDDLEWARES
// MIDDLEWARE - PARSER
launchesRouter.use("/", body_parser.json());

launchesRouter.get("/", httpGetLaunches);
launchesRouter.put("/", httpPutLaunch);
launchesRouter.delete("/:id", httpDeleteLaunch);

module.exports = { launchesRouter };
