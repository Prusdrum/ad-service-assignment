import Ad, { IAd } from '@entities/Ad';
import { QueryTypes } from 'sequelize';
import sequelize, { AdModel, IAdModel } from '@daos/sequelize';

export interface IAdDao {
  getRandomAd: () => Promise<IAd>;
  getById: (id: string) => Promise<IAd>;
}

class AdDao implements IAdDao {
  
  constructor() {
  }

  async getRandomAd() {
    const records: IAdModel[] = await sequelize.query(
      `SELECT id, imgUrl, targetUrl from Ads ORDER BY RAND() LIMIT 1`, {
      type: QueryTypes.SELECT,
    });

    if (records.length === 0) {
      throw new Error('Not found');
    }

    const ad = records[0];
    return new Ad(
      ad.id, 
      ad.imgUrl,
      ad.targetUrl,
    );
  }

  async getById(id: string) {
    const ad = await AdModel.findByPk(id);
    
    if (ad) {
      return new Ad(id, ad.imgUrl, ad.targetUrl);
    } else {
      throw new Error('Not found');
    }
  }
}

export default AdDao;