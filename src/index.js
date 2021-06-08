const express = require("express");
const response = require("./middlewares/response");
const checkJwt = require("./middlewares/jwt");

const AccountController = require("../src/controllers/AccountController");

const app = express();

app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", AccountController);

app.listen(3000, () => {
  console.log("express listening on port 3000");
});
