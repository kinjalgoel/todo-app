// server/routes/taskRoutes.js
import express from 'express';
import Task from '../models/taskModel.js';

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
  const { task, status, due_date } = req.body;

  try {
    const newTask = await Task.create({
      task: task,  
      status,
      due_date
    });

    res.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();  // Delete the task
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/filter/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM Tasks WHERE status = ?',
      [status]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error filtering tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
