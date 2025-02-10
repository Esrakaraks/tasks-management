const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersFile = path.join(__dirname, "../datas/users.json");

const loadUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

router.get("/users", (req, res) => {
  const users = loadUsers();

  if (!users) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json(users);
});

router.post("/login", (req, res) => {
  const { tc } = req.body;
  const users = loadUsers();
  const user = users.find((user) => user.tc === tc);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({ id: user.id, name: user.name, role: user.role });
});

module.exports = router;
