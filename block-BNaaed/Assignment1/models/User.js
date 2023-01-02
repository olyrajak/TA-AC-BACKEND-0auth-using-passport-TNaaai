var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema(
  {
    name: String,
    email: { type: String },
    username: { type: String, required: true, unique: true },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
