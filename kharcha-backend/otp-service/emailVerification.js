const dotenv = require("dotenv");
const ElasticEmail = require("@elasticemail/elasticemail-client");

dotenv.config();

const client = ElasticEmail.ApiClient.instance;

const apikey = client.authentications["apikey"];
apikey.apiKey = process.env.API_KEY;
const emailsApi = new ElasticEmail.EmailsApi();

const sendOTPEmail = async (recipientEmail, otp) => {
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

  const emailData = {
    Recipients: {
      To: [recipientEmail],
    },
    Content: {
      Body: [
        {
          ContentType: "PlainText",
          Charset: "utf-8",
          Content: message,
        },
      ],
      From: process.env.EMAIL_ADDRESS,
      Subject: subject,
    },
  };

  const callback = (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully.");
      console.log("Email sent.");
    }
  };

  emailsApi.emailsTransactionalPost(emailData, callback);
};

module.exports = sendOTPEmail;
