import Ad, { IAd } from '@entities/Ad';
import { QueryTypes, Sequelize } from 'sequelize';
import { IAdModel, AdModel } from '@service/sequelize/models/Ad.model';

export interface IAdDao {
  getRandomAd: () => Promise<IAd>;
  getById: (id: string) => Promise<IAd>;
}

class AdDao implements IAdDao {
  private sequelize: Sequelize;
  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async getRandomAd() {
    const records: IAdModel[] = await this.sequelize.query(
      `SELECT id, img_url, target_url from Ads ORDER BY RAND() LIMIT 1`, {
      type: QueryTypes.SELECT
    });

    const ad = records[0];
    return new Ad(
      ad.id.toString(), 
      ad.img_url,
      ad.target_url,
    );
  }

  async getById(id: string) {
    const ad = await AdModel.findByPk(id, {
      attributes: ['img_url', 'target_url']
    });
    
    if (ad) {
      return new Ad(id, ad.img_url, ad.target_url);
    } else {
      throw new Error('Not found');
    }
  }
}

export default AdDao;