const joi = require("@hapi/joi");
const { getValidatorError, getMessage } = require("../helpers/validator");

const rules = {
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirm_password: joi.string().valid(joi.ref("password")).required(),
};

const options = { abortEarly: false };

const accountSignIn = (req, res, next) => {
  const { email, password } = req.body;

  const schema = joi.object({
    email: rules.email,
    password: rules.password,
  });

  const { error } = schema.validate({ email, password }, options);
  if (error) {
    const messages = getValidatorError(error, "account.signin");

    return res.jsonBadRequest(null, null, { error: messages });
  }

  next();
};

const accountSignUp = (req, res, next) => {
  try {
    const { email, password, confirm_password } = req.body;

    const schema = joi.object({
      email: rules.email,
      password: rules.password,
      confirm_password: rules.confirm_password,
    });

    const { error } = schema.validate(
      { email, password, confirm_password },
      options
    );

    if (password != confirm_password) {
      return res.jsonUnauthorized(
        null,
        getMessage("account.signup.confirm_password.any.only"),
        null
      );
    }

    if (error) {
      const messages = getValidatorError(error, "account.signup");

      return res.jsonBadRequest(null, null, { error: messages });
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { accountSignIn, accountSignUp };
