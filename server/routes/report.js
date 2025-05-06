// server/routes/report.js
import express from 'express';
import db from '../db.js'; // Ensure this exports a .promise() wrapped connection

const router = express.Router();

router.get('/', async (req, res) => {
  const { status, end_date } = req.query;

  if (!status || !end_date) {
    return res.status(400).json({ error: 'Status and end date are required' });
  }

  if (isNaN(Date.parse(end_date))) {
    return res.status(400).json({ error: 'Invalid date format for end_date' });
  }

  try {
    const [results] = await db.query(
      'SELECT * FROM tasks WHERE status = ? AND end_date <= ?',
      [status, end_date]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: 'No tasks found for the given criteria' });
    }

    res.json(results);
  } catch (err) {
    console.error('Error fetching report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router;
