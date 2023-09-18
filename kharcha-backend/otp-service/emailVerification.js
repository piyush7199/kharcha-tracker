import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendOTPEmail = async (recipientEmail, otp) => {
  const transporter = createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const subject = "Your Verification Code for Kharcha Tracker";
  const message = `
Dear User,

Thank you for using Kharcha Tracker. To complete the verification process, please use the following one-time verification code:

Verification Code: ${otp}

Please enter this code within the next 10 minutes to verify your account. If you did not request this code, please disregard this email.

If you encounter any issues or have questions, please contact our support team at ${process.env.EMAIL_ADDRESS}.

Thank you for choosing Kharcha Tracker.

Best regards,
Team Kharcha Tracker
`;

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};
