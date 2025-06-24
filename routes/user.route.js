const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Selamat datang ${req.user.username}` });
});

module.exports = router;
