const { verifyJwt, getTokenFromHeaders } = require("../helpers/jwt");

const checkJwt = (req, res, next) => {
  const { url: path } = req;
  const excludedPaths = ["/auth/sign-in", "/auth/sign-up", "/auth/refresh"];
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));

  if (isExcluded) return next();

  const token = getTokenFromHeaders(req.headers);
  // console.log(token);
  if (!token) {
    return res.jsonUnauthorized(null, "Unauthorized");
  }
  // console.log(token);

  try {
    const decoded = verifyJwt(token);
    req.userId = decoded.id;
    console.log(decoded);
    next();
  } catch (err) {
    // console.log(err);
  }
};

module.exports = checkJwt;
