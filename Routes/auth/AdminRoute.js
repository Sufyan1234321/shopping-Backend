// Routes/auth/AdminRoute.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/middleware"); // move middleware to separate file

router.get("/", verifyToken, (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;