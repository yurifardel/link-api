const { getMessage } = require("./msg");

const getValidatorError = (error, messagePath) => {
  if (!error) return null;

  const errorMessages = {};
  console.log(error);
  error.details.map((details) => {
    const message = details.message;
    const type = details.type;
    const key = details.context.key;

    const path = `${messagePath}.${key}.${type}`;

    const customMessage = getMessage(path);
    // console.log(customMessage);
    if (!customMessage) {
      console.log("customMessage not found for path", path);
    }

    errorMessages[key] = getMessage || message;
  });

  return errorMessages;
};

module.exports = { getValidatorError, getMessage };
