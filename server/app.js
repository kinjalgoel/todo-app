// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import statusRoutes from './routes/statusRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import db from './models/db.js'; // If this is where Sequelize is exported from


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORRECT ORDER of Middleware
app.use(cors()); // Must be at the top
app.use(express.json());

// ✅ Register Routes
app.use('/api/statuses', statusRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/report', reportRoutes);

// ✅ Test DB Connection
db.authenticate()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection failed:', err));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
