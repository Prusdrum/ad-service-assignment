import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface IAdModel extends Model {
  id: number;
  img_url: string;
  target_url: string;
}

// Need to declare the static model so `findOne` etc. use correct types.
type IAdModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IAdModel;
}

export default (sequelize: Sequelize): IAdModelStatic => {
  return <IAdModelStatic>sequelize.define('Ad', {
    img_url: DataTypes.STRING,
    target_url: DataTypes.STRING
  }, {})
}

