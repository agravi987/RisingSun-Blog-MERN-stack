const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Subscription Confirmation",
      text: "Thank you for subscribing to our RisingSun blogging platform !",
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
});

module.exports = router;
