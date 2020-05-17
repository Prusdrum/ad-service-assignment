import { QueryTypes } from 'sequelize';
import sequelize, { AdActionModel, IAdActionModel } from '@daos/sequelize';

type IAdActionType = 'load' | 'click';

const AdActionType: { [key in IAdActionType]: key } = {
  click: 'click',
  load: 'load',
};

export interface IAdActionDao {
  addLoadAction: (adId: string) => Promise<void>;
  addClickAction: (adId: string) => Promise<void>;
}

class AdActionDao implements IAdActionDao {
  async addClickAction(adId: string) {
    await AdActionModel.create({
      actionType: AdActionType.click,
      adId,
      createdAt: new Date(),
    } as IAdActionModel);
  }

  async addLoadAction(adId: string) {
    await AdActionModel.create({
      actionType: AdActionType.load,
      adId,
      createdAt: new Date(),
    } as IAdActionModel);
  }
}

export default AdActionDao;