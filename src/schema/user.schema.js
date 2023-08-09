const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
}, {
  versionKey: false  // this will remove the __v key
});

module.exports = mongoose.model("User", userSchema);
