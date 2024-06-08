import User from "../Models/user.schema.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import * as crypto from "crypto";

dotenv.config();

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sidh.geetha@gmail.com",
    pass: "vcbc vbim konx ncch",
  },
});

const resetpassword = async (email) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return;
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // const token = crypto.randomBytes(20).toString("hex");

    // Prepare email details
    let details = {
      from: "sidh.geetha@gmail.com",
      to: email,
      subject: "Reset Password for the app",
      text: `Please click this link to reset the password https://main--jolly-gecko-68dd0a.netlify.app/setnew-password?token=${token}`,
    };

    // user.resetPasswordToken = token;
    /* await user.save(); */

    // Send email
    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("Error sending mail:", err);
      } else {
        console.log("Mail sent successfully");
      }
    });
  } catch (error) {
    console.error("Error in resetpassword function:", error);
  }
};

export default resetpassword;
