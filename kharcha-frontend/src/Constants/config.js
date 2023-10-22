// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded. Please wait",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  requestFailure: {
    title: "Error!",
    message: "An error occur while parsing request data",
  },
  responseFailure: {
    title: "Error!",
    message:
      "An error occur while fetching response from server. Please try again",
  },
  networkError: {
    title: "Error!",
    message:
      "Unable to connect to the server. Please check internet connectivity and try again.",
  },
};

export const SERVICE_URLS = {
  userLogin: { url: "api/user/login", method: "POST" },
  userSignup: { url: "api/user/signUp", method: "POST" },
  verifyOtp: { url: "api/otp/verify", method: "POST" },
  resendOtp: { url: "api/otp/resend", method: "PUT" },
  addIncome: { url: "/api/income", method: "POST" },
  getIncome: { url: "/api/income", method: "GET", params: true },
  updateIncome: { url: "/api/income", method: "PUT" },
  deleteIncome: { url: "/api/income", method: "DELETE" },
  addExpense: { url: "/api/expense", method: "POST" },
  getExpense: { url: "/api/expense", method: "GET", params: true },
  updateExpense: { url: "/api/expense", method: "PUT" },
  deleteExpense: { url: "/api/expense", method: "DELETE" },
  addInvestment: { url: "/api/investment", method: "POST" },
  getInvestment: { url: "/api/investment", method: "GET", params: true },
  updateInvestment: { url: "/api/investment", method: "PUT" },
  deleteInvestment: { url: "/api/investment", method: "DELETE" },
  getOverwiew: { url: "/api/overiew", method: "GET", params: true },
  getLastTrans: { url: "/api/overiew/expense", method: "GET", params: true },
  forgetPasswordMail: { url: "/api/user/account/mail", method: "PUT" },
  changePassword: { url: "/api/user/account/password", method: "PUT" },
};
