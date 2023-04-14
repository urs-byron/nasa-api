const mongoose = require("mongoose");
const { mongo_options } = require("../constants/mongo.config");

function getMongoURI(user, pw) {
  return `mongodb+srv://${user}:${pw}@api-dbs.rjt5vim.mongodb.net/zmt-nasa?retryWrites=true&w=majority`;
}

async function connectMongo() {
  mongoose
    .connect(
      getMongoURI(process.env.MONGO_USER, process.env.MONGO_PW),
      mongo_options
    )
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.log(err));
}

async function testConnectMongo() {
  try {
    mongoose.connect(process.env.MONGO_URI, mongo_options);
  } catch (err) {
    console.log(err);
  }
}

async function disconnectMongo() {
  mongoose.disconnect();
}

module.exports = { connectMongo, testConnectMongo, disconnectMongo };
