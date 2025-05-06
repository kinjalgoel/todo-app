// server/routes/reportRoutes.js
import express from 'express';
import { Op } from 'sequelize';
import Task from '../models/taskModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { status, start_date, end_date } = req.query;

  try {
    const whereConditions = {
      ...(status && { status }),
      ...(start_date && end_date && {
        createdAt: {
          [Op.between]: [start_date, end_date]
        }
      })
    };

    const tasks = await Task.findAll({ where: whereConditions });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for the given criteria' });
    }

    const averageDuration = tasks.reduce((sum, t) => sum + (t.duration || 0), 0) / tasks.length;
    const averageInvited = tasks.reduce((sum, t) => sum + (t.invited || 0), 0) / tasks.length;
    const averageAttendanceRate = tasks.reduce((sum, t) => sum + ((t.attended || 0) / (t.invited || 1)), 0) / tasks.length;

    res.json({
      tasks,
      statistics: {
        averageDuration,
        averageInvited,
        averageAttendanceRate,
      },
    });
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ message: 'Failed to generate report', error: err.message });
  }
});

export default router;
