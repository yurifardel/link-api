const User = require("../../database/models/user");

const { Router } = require("express");

const router = Router();

const {
  generateJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
} = require("../helpers/jwt");

router.post("/sign-up", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.json({ status: 400, error: "user already exists" });
    }

    const user = User.create({ email, password });

    const promise = user.then((data) => {
      const token = generateJwt({ id: data.id });
      const refreshToken = generateRefreshJwt({
        id: data.id,
        version: data.jwtVersion,
      });

      return res.json({ data, token, refreshToken });
    });

    return promise;
  } catch (err) {
    return res.json({ status: 400, error: "register failed" });
  }
});

router.post("/refresh", async (req, res) => {
  const token = getTokenFromHeaders(req.headers);

  if (!token) {
    return res.json({ error: "token nonexistent" });
  }

  try {
    const decoded = verifyRefreshJwt(token);

    const account = await User.findById(decoded.id);
    console.log(account);

    if (!account) return res.json({ error: "not token in account" });

    if (decoded.version != account.jwtVersion) {
      return res.json({ error: "not version" });
    }

    const meta = {
      token: generateJwt({ id: account.id }),
    };

    return res.json({ meta });
  } catch (err) {
    return res.json({ error: "error in refresh token" });
  }
});

module.exports = router;
