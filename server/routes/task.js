// server/routes/task.js
import express from 'express';
import Task from '../models/taskModel.js';  // Sequelize model for Task

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll(); // Using Sequelize to get all tasks
    res.json(tasks); // Return tasks in JSON format
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { task, user_id } = req.body;
  try {
    const newTask = await Task.create({ task, user_id }); // Creating a new task using Sequelize
    res.json(newTask); // Return the newly created task in JSON format
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
