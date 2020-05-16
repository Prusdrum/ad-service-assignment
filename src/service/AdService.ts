import ClientAd, { IClientAd } from './model/ClientAd';
import { IAdDao } from '@daos/Ads/AdDao';
import { IAd } from '@entities/Ad';

interface IAdService {
  loadAd: () => IClientAd;
  adClicked: (id: string) => IAd;
}

class AdService implements IAdService {
  private adDao: IAdDao;
  constructor(adDao: IAdDao) {
    this.adDao = adDao;
  }

  loadAd() {
    const ad = this.adDao.getRandomAd();

    const redirectUrl = `/api/ads/callback/${ad.id}`;
    return new ClientAd(ad.imgUrl, redirectUrl);
  }

  adClicked(id: string) {
    return this.adDao.getById(id);
  }
}

export default AdService;