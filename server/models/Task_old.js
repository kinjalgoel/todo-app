import express from 'express';
import pool from './config.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const [tasks] = await pool.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { task, user_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (task, user_id) VALUES (?, ?)',
      [task, user_id]
    );
    res.json({ id: result.insertId, task, user_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
