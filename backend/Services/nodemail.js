
import express from "express";
import nodemailer from "nodemailer";
const app = express();

app.use(express.json());

const mail = () => {};
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sidh.geetha@gmail.com",
    pass: "vcbc vbim konx ncch",
  },
});
let details = {
  from: "sidh.geetha@gmail.com",
  to: "sidh.geetha@gmail.com",
  subject: "Login msg",
  text: "login successfully",
};

mailTransporter.sendMail(details, (err) => {
  if (err) {
    console.log("mail not found");
  } else {
    console.log("mail sent successfully");
  }
});

export default mail;
