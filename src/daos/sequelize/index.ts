import { Sequelize, DataTypes } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];

import defineAdModel, { IAdModel } from './models/Ad.model';

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const AdModel = defineAdModel(sequelize);

export {
  AdModel,
  IAdModel,
}
export default sequelize;