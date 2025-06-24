const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { getUsers, getUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUser);

module.exports = router;
