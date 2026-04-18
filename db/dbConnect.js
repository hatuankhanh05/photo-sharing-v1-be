const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB Atlas!");
  } catch(err) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(err);
  }
}

module.exports = dbConnect;
