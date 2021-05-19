const User = require("../../database/models/user");
// const {} = require('../helpers/msg')
const {
  generateJwt,
  generateRefreshJwt,
  verifyRefreshJwt,
  getTokenFromHeaders,
} = require("../helpers/jwt");

module.exports = {
  async index(req, res) {
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
  },
};
