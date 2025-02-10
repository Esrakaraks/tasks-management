const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const tasksFile = path.join(__dirname, "../datas/tasks.json");

const loadTasks = () => {
  try {
    const data = fs.readFileSync(tasksFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

router.get("/", (req, res) => {
    const { userId, role } = req.query;
  
    const tasks = loadTasks();
  
    if (role === "admin") {
      return res.json(tasks);
    }
  
    const userTasks = tasks.filter(task => String(task.userId) === userId);
    
    res.json(userTasks);
});

const saveTasks = (tasks) => {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

router.post("/", (req, res) => {
    const { title, description, userId, role } = req.body;
    const tasks = loadTasks();
  
    if (!userId && role !== "admin") {
      return res.status(400).json({ message: "User ID is missing." });
    }
  
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      status: "InComplete",
      userId: role === "admin" ? userId : req.body.userId,
    };
  
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    let tasks = loadTasks();
  
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found." });
    }
  
    tasks[taskIndex] = { ...tasks[taskIndex], title, description, status };
    saveTasks(tasks);
    res.json(tasks[taskIndex]);
  });

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let tasks = loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found." });
    } 
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
  
    res.json({ message: "Task deleted successfully." });
  });

module.exports = router;
