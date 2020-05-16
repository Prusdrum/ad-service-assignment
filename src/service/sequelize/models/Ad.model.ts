import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

// Need to declare the static model so `findOne` etc. use correct types.
type IAdModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IAdModel;
}

let AdModel: IAdModelStatic;

export {
  AdModel
};

export default (sequelize: Sequelize) => {
  AdModel = <IAdModelStatic>sequelize.define('Ad', {
    img_url: DataTypes.STRING,
    target_url: DataTypes.STRING
  }, {})
}

export interface IAdModel extends Model {
  id: number;
  img_url: string;
  target_url: string;
}