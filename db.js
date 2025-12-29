const mongoose = require("mongoose");

let isConnected = false;

async function connectDB(uri) {
  if (isConnected) return;

  await mongoose.connect(uri);
  isConnected = true;
}

module.exports = connectDB;
