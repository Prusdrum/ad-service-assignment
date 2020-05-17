import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface IAdActionModel extends Model {
  id: number;
  adId: number;
  actionType: string;
  createdAt: Date;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IAdActionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IAdActionModel;
}

export default (sequelize: Sequelize): IAdActionModelStatic => {
  return <IAdActionModelStatic>sequelize.define('AdAction', {
    adId: DataTypes.INTEGER,
    actionType: DataTypes.STRING,
    createdAt: DataTypes.DATE,
  }, {})
}

