const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("enter correct email address");
        }
      },
    },
    password: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Enter correct Gender !!");
        }
      },
    },
    skills: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
