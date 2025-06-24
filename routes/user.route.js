const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUser);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
