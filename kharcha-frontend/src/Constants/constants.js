export const COLORS = {
  MAIN_COLOR: "rgba(146, 145, 232, 255)",
  DARK_BLACK_COLOR: "rgba(0, 0, 0, 1)",
  LIGHT_COLOR: "rgba(245, 247, 255, 255)",
  GREEN_COLOR: "#91E892",
  BACK_GRUND_OPT1: "rgba(39,45,53,255)",
  BACK_GRUND_OPT2: "rgba(14,19,26,255)",
  BACK_GRUND_OPT3: "gray.900",
};

export const PAGENAMES = {
  EXPENSE: "expenses",
  INCOME: "income",
  INVESTMENT: "investments",
};

export const linkStyle = {
  fontSize: { base: "0.85rem", md: "0.95rem" },
  textAlign: "center",
  marginTop: "5",
};

export const messageStyle = {
  fontSize: "1rem",
};

export const footerTextStyle = {
  fontSize: "0.95em",
  textAlign: "center",
  marginTop: "4",
  color: "grey",
  "@media (max-width: 850px)": {
    fontSize: "0.85em",
  },
};

export const getErrorToastForInvalidData = (name) => {
  const res = {
    title: "Invalid data.",
    description: `Please provide ${name}.`,
    status: "error",
    duration: 1000,
    isClosable: true,
  };

  return res;
};

export const CustomTooltip = ({ active, payload, label }) => {
  const tooltipStyle = {
    backgroundColor: "white", // Set the background color to white
    border: "1px solid #ccc",
    padding: "10px",
    width: "100%",
  };
  try {
    if (active) {
      const filteredPayload = payload.filter((entry) => entry.value !== 0); // Filter out zero values
      return (
        <div className="custom-tooltip" style={tooltipStyle}>
          <p className="label" style={{ color: "black" }}>{`${label}`}</p>
          {filteredPayload.map((entry) => (
            <p key={entry.dataKey} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${
                entry.value >= 0 ? entry.value : entry.value * -1
              }`}
            </p>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const getInvalidToastMessage = (msg) => {
  const res = {
    title: "Invalid data.",
    description: msg,
    status: "error",
    duration: 1000,
    isClosable: true,
  };

  return res;
};

export const contactErrorToast = () => {
  const res = {
    title: "Oops...!! Something went wrong",
    description: "Contact harchatracker@gmail.com",
    status: "error",
    duration: 1000,
    isClosable: true,
  };
  return res;
};

export const getToast = (title, message, isError) => {
  const res = {
    title: title,
    description: message,
    status: isError ? "error" : "success",
    duration: isError ? 5000 : 1000,
    isClosable: true,
  };
  return res;
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
  const sanitizedName = name.replace(/\s/g, "");
  const validNameRegex = /^[A-Za-z]{1,}$/;
  console.log(name);
  console.log(validNameRegex.test(sanitizedName));
  return validNameRegex.test(sanitizedName);
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month}-${day}`;
};

export const getStartDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  return `${year}-${month}-01`;
};

export const getFormatedDate = (date) => {
  const dateComponents = date.split("-");

  if (dateComponents.length !== 3) {
    return;
  }

  const year = parseInt(dateComponents[0]);
  const month = parseInt(dateComponents[1]) - 1;
  const day = parseInt(dateComponents[2]);

  const parsedDate = new Date(year, month, day);

  const options = { month: "short", day: "2-digit", year: "numeric" };
  return parsedDate.toLocaleDateString("en-US", options);
};
