require("dotenv").config();

const jwt = require("jsonwebtoken");

const TokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const RefreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const option = { expiresIn: "30 minutes" };
const refreshOptions = { expiresIn: "30 days" };

const generateJwt = (payload) => {
  return jwt.sign(payload, TokenPrivateKey, option);
};

const generateRefreshJwt = (payload) => {
  return jwt.sign(payload, RefreshTokenPrivateKey, refreshOptions);
};

const verifyJwt = (token) => {
  return jwt.verify(token, TokenPrivateKey);
};

const verifyRefreshJwt = (token) => {
  return jwt.verify(token, RefreshTokenPrivateKey);
};

const getTokenFromHeaders = (headers) => {
  let token = headers["authorization"];
  console.log(token);
  token = token ? token.slice(7, token.length) : null;
  // console.log("VERIFICAÇÃO DO TOKEN: " + token);
  return token;
};

module.exports = {
  generateJwt,
  generateRefreshJwt,
  verifyJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
};
