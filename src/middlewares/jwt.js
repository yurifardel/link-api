const { verifyJwt, getTokenFromHeaders } = require("../helpers/jwt");

const checkJwt = (req, res, next) => {
  const { url: path } = req;
  const excludedPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/refresh"];
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));

  if (isExcluded) return next();

  const token = getTokenFromHeaders(req.headers);
  console.log(token);
  if (!token) {
    return res.jsonUnauthorized(null, "entrou");
  }

  try {
    const decoded = verifyJwt(token);
    req.accountId = decoded.indexOf;
    next();
  } catch (err) {
    // console.log(err);
  }
};

module.exports = checkJwt;
