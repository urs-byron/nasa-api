const path = require("node:path");
const express = require("express");
const morgan = require("morgan");

const app = express();
const { apiV1 } = require("./routes/api.ver/api.v1");

// MIDDLEWARES
// MIDDLEWARE - HEADERS CORS
app.use("/v1", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  next();
});

// MIDDLEWARE - MORGAN
app.use(morgan("combined"));

// MIDDLEWARE - STATIC
app.use(express.static(path.resolve(__dirname, "..", "public")));

// ROUTES
app.use("/v1", apiV1);
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", " ", "index.html"));
});

module.exports = { app };
