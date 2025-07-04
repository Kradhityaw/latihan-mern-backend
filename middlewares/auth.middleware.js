const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Dibutuhkan autentikasi" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: "Pengguna tidak ditemukan" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};

module.exports = { authenticate };
