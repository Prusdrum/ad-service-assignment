import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface IAdModel extends Model {
  id: string;
  imgUrl: string;
  targetUrl: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IAdModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IAdModel;
}

export default (sequelize: Sequelize): IAdModelStatic => {
  return <IAdModelStatic>sequelize.define('Ad', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    imgUrl: DataTypes.STRING,
    targetUrl: DataTypes.STRING
  }, {})
}

