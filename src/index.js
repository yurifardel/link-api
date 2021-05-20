const express = require("express");

const AccountController = require("../src/controllers/AccountController");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", AccountController);

app.listen(3000, () => {
  console.log("express listening on port 3000");
});
