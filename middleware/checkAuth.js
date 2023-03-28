const jwt = require("jsonwebtoken");
const config = require("config");

exports.checkAuth = (req, res, next) => {
  try {
    if (req.headers) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(400).json({
          code: 400,
          status: "failed",
          message: "Authorization token required",
        });
      }
      const token = authHeader.split(" ")[1];

      // ******* validate access token which is stored in header  *****
      jwt.verify(token, config.get("JwtKey"), (err, accessTokenDecoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            code: 401,
            status: "failed",
            message: "Authentication failed.",
          });
        }
        req.userData = accessTokenDecoded;
        next();
      });
    } else {
      return res.status(400).json({
        code: 400,
        status: "failed",
        message: "Authorization token required",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      status: "failed",
      message: "Internal Server Error. Please try again later.",
    });
  }
};
