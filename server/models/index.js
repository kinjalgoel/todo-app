const { Sequelize, DataTypes } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize('your_database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define Task model
const Task = sequelize.define('Task', {
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

// Define Status model (optional if you want to store statuses)
const Status = sequelize.define('Status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'statuses',
  timestamps: false
});

module.exports = { sequelize, Task, Status };
