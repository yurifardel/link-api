const { Router } = require("express");

const AccountController = require("./controllers/AccountController");

const router = Router();

router.post("/account/create", AccountController.index);

module.exports = router;
