const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rajankumar07:sS4ZToOuQz8J14Sd@avengers.ja9vq.mongodb.net/devTinder02"
  );
};

module.exports = connectDB;
