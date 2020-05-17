import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface IAdActionModel extends Model {
  id: number;
  ad_id: number;
  action_type: string;
  timestamp: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IAdActionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IAdActionModel;
}

export default (sequelize: Sequelize): IAdActionModelStatic => {
  return <IAdActionModelStatic>sequelize.define('AdAction', {
    ad_id: DataTypes.INTEGER,
    action_type: DataTypes.STRING,
    timestamp: DataTypes.INTEGER,
  }, {})
}

