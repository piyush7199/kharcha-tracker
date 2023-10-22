export const collectionNames = {
  USERS: "users",
};

export const errorMessage = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

const appRelatedConsts = {
  appName: "Kharcha Tracker",
  appEmail: "kharchatracker@gmail.com",
};

export const getSignupMessage = (userName, otp) => {
  const subject = `OTP Verification for ${appRelatedConsts.appName}`;
  const message = `
Dear ${userName},

Your OTP (One-Time Password) for ${appRelatedConsts.appName} registration is: ${otp}

Please note that this OTP is valid for 10 minutes. After this time, it will expire, and you will need to request a new OTP if necessary.

If you didn't request this OTP or if you have any questions, please contact our support team at ${appRelatedConsts.appEmail}.

To complete the registration process, please enter this OTP in the app as soon as possible.

Best regards,
The ${appRelatedConsts.appName} Team
`;
  const signUpMessageAndSubject = {
    subject: subject,
    message: message,
  };
  return signUpMessageAndSubject;
};

export const getResendOtpEmail = (userName, otp) => {
  const subject = `Resend OTP Verification for ${appRelatedConsts.appName}`;
  const message = `
Dear ${userName},

We received your request to resend the OTP (One-Time Password) for [Your App Name] registration. Here is your new OTP:

New OTP: ${otp}

Please note that this OTP is valid for 10 minutes. After this time, it will expire, and you will need to request a new OTP if necessary.

If you didn't request this OTP or if you have any questions, please contact our support team at ${appRelatedConsts.appEmail}.

To complete the registration process, please enter this OTP in the app as soon as possible.

Best regards,
The ${appRelatedConsts.appName} Team
`;
  const resendMessageAndSubject = {
    subject: subject,
    message: message,
  };
  return resendMessageAndSubject;
};

export const getEmailChangeMail = (userName, otp, newEmail) => {
  const subject = `Verify Your New Email Address for ${appRelatedConsts.appName}`;
  const message = `
Dear ${userName},

You have requested to change your email address for your ${appRelatedConsts.appName} account. To complete this change, please enter the verification code below:

Verification Code: ${otp}

Please keep this code confidential. It is valid for the next 10 minutes. If you did not request this change or have any concerns, please contact our support team at ${appRelatedConsts.appEmail}.

Once you have entered the verification code, your email address will be updated to ${newEmail}. You can now use ${newEmail} to log in to your ${appRelatedConsts.appName} account.

Thank you for using ${appRelatedConsts.appName}. If you have any questions or need assistance, please don't hesitate to reach out.

Best regards,
The ${appRelatedConsts.appName} Team
`;
  const emailChangeMessageAndSubject = {
    subject: subject,
    message: message,
  };
  return emailChangeMessageAndSubject;
};

export const getForgetEmail = (userName, otp) => {
  const subject = `Password Reset Request for ${appRelatedConsts.appName}`;
  const message = `
Hello ${userName},

We received a request to reset your password for your ${appRelatedConsts.appName} account. To complete the password reset process, please follow the instructions below.

Password Reset Code: ${otp}

Please use the code above to reset your password. This code is valid for the next 10 minutes. If you didn't request this password reset or have any concerns, please contact our support team at ${appRelatedConsts.appEmail} immediately.

Once your password is reset, you can log in to your ${appRelatedConsts.appName} account using your new password.

Thank you for choosing ${appRelatedConsts.appName}. If you need further assistance or have any questions, please feel free to reach out to our support team.

Best regards,
The ${appRelatedConsts.appName} Team
`;
  const emailChangeMessageAndSubject = {
    subject: subject,
    message: message,
  };
  return emailChangeMessageAndSubject;
};
