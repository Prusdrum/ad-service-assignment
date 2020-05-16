import ClientAd, { IClientAd } from './model/ClientAd';
import { IAdDao } from '@daos/Ads/AdDao';
import { IAd } from '@entities/Ad';

interface IAdService {
  loadAd: () => Promise<IClientAd>;
  adClicked: (id: string) => Promise<IAd>;
}

class AdService implements IAdService {
  private adDao: IAdDao;
  constructor(adDao: IAdDao) {
    this.adDao = adDao;
  }

  async loadAd() {
    const ad = await this.adDao.getRandomAd();

    const redirectUrl = `/api/ads/callback/${ad.id}`;
    return new ClientAd(ad.imgUrl, redirectUrl);
  }

  async adClicked(id: string) {
    return await this.adDao.getById(id);
  }
}

export default AdService;