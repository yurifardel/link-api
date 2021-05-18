const User = require("../../database/models/user");

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.json({ status: 400, error: "user already exists" });
      }

      const user = User.create(req.body);

      const promise = user.then((data) => {
        return res.json(data);
      });

      return promise;
    } catch (err) {
      return res.json({ status: 400, error: "register failed" });
    }
  },
};
