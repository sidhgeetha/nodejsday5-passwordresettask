// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  resetPasswordToken: String,
});

const User = mongoose.model("User", userSchema);
export default User;
