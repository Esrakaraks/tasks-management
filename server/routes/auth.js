const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();

const usersFile = path.join(__dirname, "../datas/users.json");

const SECRET_KEY = "supersecretkey";

const loadUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, tc: user.tc, name: user.name, role: user.role },
    SECRET_KEY,
    { expiresIn: "2h" }
  );
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token gerekli!" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Geçersiz token!" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/register", (req, res) => {
  const { tc, name, role } = req.body;
  let users = loadUsers();

  if (!/^[1-9][0-9]{10}$/.test(tc)) {
    return res.status(400).json({ message: "Invalid TR ID Number." });
  }
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required!" });
  }
  if (!role) {
    return res.status(400).json({ message: "Role is required!"});
  }
  if (users.find((user) => user.tc === tc)) {
    return res.status(400).json({ message: "Tc number is already registered!" });
  }

  const userRole = role === "admin" || role === "user" ? role : "user";
  const newUser = { id: users.length + 1, tc, name, role: userRole };
  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "Registration successful!", user: newUser });
});

router.post("/login", (req, res) => {
  const { tc } = req.body;
  const users = loadUsers();
  const user = users.find((user) => user.tc === tc);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const token = generateToken(user);

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

router.get("/users", verifyToken, (req, res) => {
  const users = loadUsers();
  res.json(users);
});

module.exports = router;
