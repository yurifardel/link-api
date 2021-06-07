const msg = require("../config/msgs.json");

const getMessage = (path) => {
  return msg[path] || null;
};

module.exports = { getMessage };
