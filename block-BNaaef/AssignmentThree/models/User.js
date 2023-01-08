var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 4, required: true },
    // username: { type: String, required: true, unique: true },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
      // console.log("ddddd");
    });
  } else {
    next();
  }
});
UserSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};
var User = mongoose.model("User", UserSchema);

module.exports = User;
