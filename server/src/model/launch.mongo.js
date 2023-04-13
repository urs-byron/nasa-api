const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  flightNumber: { type: Number, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  launchDate: { type: Date, required: true },
  target: { type: String, required: false },
  customers: { type: [String], required: false },
  upcoming: { type: Boolean, required: true, default: true },
  success: { type: Boolean, required: false, default: true },
});

const latestLaunchFlightNum = new mongoose.Schema({
  flightNumber: { type: Number, required: true },
});

const launchModel = mongoose.model("launch", launchSchema);
const latestLaunchFlightNumModel = mongoose.model(
  "latest flight number",
  latestLaunchFlightNum
);

module.exports = { launchModel, latestLaunchFlightNumModel };
