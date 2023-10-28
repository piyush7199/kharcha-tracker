import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { createTransport } from "nodemailer";

dotenv.config();

const sendEmail = asyncHandler(async (emailId, messageAndSubject) => {
  try {
    console.log("Sending Email using nodemailer");
    const transporter = await createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: emailId,
      subject: messageAndSubject.subject,
      text: messageAndSubject.message,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Verification Email send to ${emailId}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default sendEmail;
