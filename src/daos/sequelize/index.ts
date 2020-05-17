import { Sequelize, DataTypes } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config')[env];
console.log(env)
import defineAdModel, { IAdModel } from './models/Ad.model';
import defineAdActionModel, { IAdActionModel } from './models/AdAction.model';

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const AdModel = defineAdModel(sequelize);
const AdActionModel = defineAdActionModel(sequelize);

export {
  AdModel,
  IAdModel,
  AdActionModel,
  IAdActionModel,
}
export default sequelize;