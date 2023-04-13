const express = require("express");
const body_parser = require("body-parser");

const planetsRouter = express.Router();

// MIDDLEWARES
// MIDDLEWARE - CORS
planetsRouter.use("/", body_parser.json());

// CONTROLLERS
const { getPlanets } = require("./planets.controller");

planetsRouter.get("/", getPlanets);

module.exports = { planetsRouter };
