const express = require("express");
const router = express.Router();
const repositories = [];

router.get("/", (req, res) => {
  return res.json(repositories);
});

router.post("/", (req, res) => {
  return res.json({ message: "OK" });
});

router.put("/", (req, res) => {
  return res.json({ message: "OK" });
});

router.delete("/", (req, res) => {
  return res.json({ message: "OK" });
});

module.exports = router;

