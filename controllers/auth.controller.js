const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Registrasi pengguna baru
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: "Registrasi berhasil" });
  } catch (error) {
    next(error);
  }
};

// Masuk dengan pengguna yang sudah terdaftar
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Pengguna tidak ditemukan" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
