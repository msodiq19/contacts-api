const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res
        .status(400)
        .json({ message: "Unauthorized - No token provided" });

    const isCustomAuth = token.length < 500
    let decodedData;

    if (token && isCustomAuth) {
        decodedData = jwt.verify(token, SECRET_KEY);
        req.userId = decodedData.id
    }
    next()
  } catch (error) {
    res.status(401).json({ message: "Uauthorized - invalid token" });
  }
};

module.exports = auth;
