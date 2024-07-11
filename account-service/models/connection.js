const mongoose = require("mongoose");
const config = require("@config");
const clr = require("@utils/config/logcolor");

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);

// Set environment variables
const env = config.NODE_ENV || "development";
const host = config.MONGO.HOST || "localhost";
const port = config.MONGO.PORT || 27017;
const user = config.MONGO.USER || "";
const pass = config.MONGO.PASS || "";
const dbName = config.ETAVIRP.DATABASE || "no_db";

let connect_urls = {
  development: `mongodb://${host}:${port}/${dbName}`,
  production: `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`,
};

// Create connection
const dbConnect = async () => {
  await mongoose.connect(connect_urls[env]);
};

// Remove connection
const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

// Init connection
dbConnect();

// Signal connection
mongoose.connection
  .once("open", function () {
    console.info(
      `${clr.fg.magenta}Database: 😃 MongoDB (${env}) is connected!`
    );
  })
  .on("error", function (err) {
    console.error(`${clr.fg.red}Database: 😡 MongoDB connection error`, err);
  })
  .on("disconnected", function () {
    console.warn(`${clr.fg.yellow} Database: 😡 MongoDB is disconnected`);
  });

module.exports = { mongoose, dbConnect, dbDisconnect };
