const { connectMongo } = require("./mongo");
const { loadHabitablePlanets } = require("../model/planets.model");
const { loadLaunches } = require("../model/launch.model");

async function startServer(server, PORT) {
  await loadHabitablePlanets();
  await connectMongo();
  await loadLaunches();
  server.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
  });
}

module.exports = { startServer };
