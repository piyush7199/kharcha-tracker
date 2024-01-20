import axios from "axios";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

dotenv.config();

const sendEmail = asyncHandler(async (emailId, messageAndSubject) => {
  const url = process.env.EMAIL_SERVICE_URL;
  const authToken = process.env.EMAIL_SERVICE_TOKEN;
  const apiUrl = url + "/email/send";

  const emailData = {
    emailId: emailId,
    messageAndSubject: messageAndSubject,
  };

  try {
    const response = await axios.post(apiUrl, emailData, {
      headers: {
        authtoken: authToken,
        "Content-type": "application/json",
      },
    });
    console.log("Status Code:", response.status);
  } catch (error) {
    console.error("Error:", error.message);
  }
});

export default sendEmail;
