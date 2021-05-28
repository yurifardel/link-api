const { getMessage } = require("../helpers/msg");

const TYPEJSON = "application/json";
const STATUS_CODE_OK = 200;
const STATUS_CODE_BADREQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOTFOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function (data, message, metadata) {
  message = message ? message : getMessage("response.json_ok");
  metadata = metadata ? metadata : {};

  this.status(STATUS_CODE_OK);
  this.type(TYPEJSON);

  return this.json({ message, data, metadata, status: STATUS_CODE_OK });
};

const jsonBadRequest = function (data, message, metadata) {
  message = message ? message : getMessage("response.json_bad_request");
  metadata = metadata ? metadata : {};

  this.status(STATUS_CODE_BADREQUEST);
  this.type(TYPEJSON);

  return this.json({ message, data, metadata, status: STATUS_CODE_BADREQUEST });
};

const jsonUnauthorized = function (data, message, metadata) {
  console.log("mensagem", message);
  console.log("data", data);

  message = message ? message : getMessage("response.json_unauthorized");
  metadata = metadata ? metadata : {};

  this.status(STATUS_CODE_UNAUTHORIZED);
  this.type(TYPEJSON);

  return this.json({
    message,
    data,
    metadata,
    status: STATUS_CODE_UNAUTHORIZED,
  });
};

const jsonNotFound = function (data, message, metadata) {
  message = message ? message : getMessage("response.json_not_found");
  metadata = metadata ? metadata : {};

  this.status(STATUS_CODE_NOTFOUND);
  this.type(TYPEJSON);

  return this.json({ message, data, metadata, status: STATUS_CODE_NOTFOUND });
};

const jsonServerError = function (data, message, metadata) {
  message = message ? message : getMessage("response.json_server_error");
  metadata = metadata ? metadata : {};

  this.status(STATUS_CODE_SERVER_ERROR);
  this.type(TYPEJSON);

  return this.json({
    message,
    data,
    metadata,
    status: STATUS_CODE_SERVER_ERROR,
  });
};

const response = (req, res, next) => {
  res.jsonOK = jsonOK;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  res.jsonServerError = jsonServerError;

  next();
};

module.exports = response;
