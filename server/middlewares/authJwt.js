const jwt = require("jsonwebtoken");
const config = require("../config/system.config");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.body['access_token'];

  if (!token) {
    return res.status(200).send({
      error: true,
      message: "Please provide authorization credentials for accessing this endpoint."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(200).send({
        error: true,
        message: "Unauthorized."
      });
    }

    req.userId = decoded._id;
    next();
  });
};


const authJwt = {
  verifyToken,
};

module.exports = authJwt;
