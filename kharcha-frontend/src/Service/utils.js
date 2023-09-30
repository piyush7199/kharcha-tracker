//Validate Password Pattern
function validatePassword(pw) {
  if (pw.length >= 8 && pw.length <= 30) {
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) {
      if (/\d/.test(pw)) {
        if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pw)) {
          return "";
        } else {
          return "Password should have at least 1 spacial character.";
        }
      } else {
        return "Password should contain at least 1 digit.";
      }
    } else {
      return "Password should have at least 1 uppercase and lowercase character.";
    }
  } else {
    return "Password should be 8 to 30 characters long.";
  }
}

// Validate Email Pattern
function validateEmail(mailId) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(mailId)) {
    return true;
  }
  return false;
}

// validate phone number pattern
function validatePhoneNumber(inputtxt) {
  if (/^\(?([1-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputtxt)) {
    return true;
  }
  return false;
}


const utils={
  validateEmail,
  validatePassword,
  validatePhoneNumber
}

export default utils;
