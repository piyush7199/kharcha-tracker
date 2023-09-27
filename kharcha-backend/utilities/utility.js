export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z].*)(?=.*\d.*)(?=.*[\W_].*).{6,20}$/;
  return passwordRegex.test(password);
};

export const isValidUserName = (userName) => {
  const validUsernameRegex = /^[a-zA-Z0-9]{4,9}$/;
  return validUsernameRegex.test(userName);
};

export const isValidName = (name) => {
  const sanitizedName = name.replace(/\s/g, ""); // Remove spaces
  const validNameRegex = /^[A-Za-z]{1,}$/;
  return validNameRegex.test(sanitizedName);
};
