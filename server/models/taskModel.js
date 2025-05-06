import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Task = sequelize.define('Task', {
  task: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  invited: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  attended: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

export default Task;
