// server/models/statusModel.js
import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Status = sequelize.define('Status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'statuses',
  timestamps: false,
});

export default Status;
