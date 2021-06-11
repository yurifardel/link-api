const User = require("../../database/models/user");
const bcrypt = require("bcryptjs");
const mongo = require("mongoose");

const { accountSignIn, accountSignUp } = require("../validator/account");
const { getMessage } = require("../helpers/validator");

const { Router } = require("express");

const router = Router();

const {
  generateJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
} = require("../helpers/jwt");

router.post("/sign-up", accountSignUp, async (req, res) => {
  try {
    const { email, password } = req.body;

    const id = mongo.Types.ObjectId();
    const account = await User.findOne({ email });
    if (account) {
      return res.jsonBadRequest(
        null,
        getMessage("account.signin.email_exists"),
        null
      );
    }

    const user = await User.create({ email, password, id_usuario: id });

    const token = generateJwt({ id: user.id });
    const refreshToken = generateRefreshJwt({
      id: user.id,
      version: user.jwtVersion,
    });

    await User.findByIdAndUpdate(user.id, {
      $set: {
        token: token,
        refreshToken: refreshToken,
      },
    });

    return res.jsonOK(user, getMessage("account.signup.success"), {
      token,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: 400, error: "register failed" });
  }
});

router.post("/sign-in", accountSignIn, async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.json({ error: "user not found" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.json(getMessage("account.signin.invalid"));
  }

  const token = generateJwt({ id: user.id });
  const refreshToken = generateRefreshJwt({
    id: user.id,
    version: user.jwtVersion,
  });

  return res.json({ user, metadata: { token, refreshToken } });
});

router.post("/refresh", async (req, res) => {
  const token = getTokenFromHeaders(req.headers);

  if (!token) {
    return res.json({ error: "token nonexistent" });
  }

  try {
    const decoded = verifyRefreshJwt(token);

    const account = await User.findById(decoded.id);

    if (!account) return res.json({ error: "not token in account" });

    if (decoded.version != account.jwtVersion) {
      return res.json({ error: "not version" });
    }

    const meta = {
      token: generateJwt({ id: account.id }),
    };

    await User.findByIdAndUpdate(account.id, {
      $set: {
        refreshToken: meta.token,
      },
    });

    return res.json({ meta });
  } catch (err) {
    return res.json({ error: "error in refresh token" });
  }
});

module.exports = router;
