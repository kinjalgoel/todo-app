import express from 'express';
import Status from '../models/statusModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.json(statuses);
  } catch (error) {
    console.error('Error in /api/statuses:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
