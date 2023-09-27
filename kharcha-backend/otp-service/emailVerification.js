import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { createTransport } from "nodemailer";

dotenv.config();

const sendOTPEmail = asyncHandler(async (emailId, otp) => {
  try {
    const subject = "Your Verification Code for Kharcha Tracker";
    const message = `
Dear User,

Verification Code: ${otp}
Please enter this code within the next 10 minutes to verify your account.

If you encounter any issues or have questions, please contact our support team at ${process.env.EMAIL_ADDRESS}.

Best regards,
Team Kharcha Tracker
`;

    const transporter = createTransport({
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
      subject: subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
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

export default sendOTPEmail;
