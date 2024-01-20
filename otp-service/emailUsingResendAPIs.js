// import { Resend } from "resend";
// import asyncHandler from "express-async-handler";
// import dotenv from "dotenv";

// dotenv.config();

// const sendEmailUsingResendAPIS = asyncHandler(
//   async (emailId, messageAndSubject) => {
//     try {
//       console.log("Sending Email using resend");
//       const resend = new Resend(process.env.API_KEY);

//       const data = await resend.emails.send({
//         from: "Kharcha Tracker <onboarding@resend.dev>",
//         to: [emailId],
//         subject: messageAndSubject.subject,
//         text: messageAndSubject.message,
//         headers: {
//           "X-Entity-Ref-ID": "123456789",
//         },
//       });

//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export default sendEmailUsingResendAPIS;
