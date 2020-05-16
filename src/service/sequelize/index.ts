import { Sequelize, DataTypes } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];

import defineAdModel from './models/Ad.model';

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

defineAdModel(sequelize);

export default sequelize;