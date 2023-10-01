export const getErrorResponse = (msg) => {
  const res = { status: "error", message: msg };
  return res;
};

export const getErrorResponseForUnprovidedFields = (name) => {
  return getErrorResponse(`Please provide ${name}.`);
};
