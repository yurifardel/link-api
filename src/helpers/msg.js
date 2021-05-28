const msg = require("../config/msgs.json");

const getMessage = (path) => {
  console.log(msg[path]);
  return msg[path] || null;
};

module.exports = { getMessage };
