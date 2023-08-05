const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  dob: {
    type: String,
  },
  mobile: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
