const http = require("node:http");
require("dotenv").config();
require("express-async-errors");

const PORT = process.env.SERVER_PORT || 8000;

const { app: express_app } = require("./app");
const { startServer } = require("./util/server.util");

const server = http.createServer(express_app);

startServer(server, PORT);
