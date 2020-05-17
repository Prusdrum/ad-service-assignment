import ClientAd, { IClientAd } from './model/ClientAd';
import { IAdDao } from '@daos/Ads/AdDao';
import { IAd } from '@entities/Ad';
import { IAdActionDao } from '@daos/Ads/ActionDao';

interface IAdService {
  loadAd: () => Promise<IClientAd>;
  adClicked: (id: string) => Promise<IAd>;
}

class AdService implements IAdService {
  private adDao: IAdDao;
  private actionsDao: IAdActionDao;
  constructor(adDao: IAdDao, actionsDao: IAdActionDao) {
    this.adDao = adDao;
    this.actionsDao = actionsDao;
  }

  async loadAd() {
    const ad = await this.adDao.getRandomAd();

    this.actionsDao.addLoadAction(ad.id);

    const redirectUrl = `/api/ads/callback/${ad.id}`;
    return new ClientAd(ad.imgUrl, redirectUrl);
  }

  async adClicked(id: string) {
    const ad = await this.adDao.getById(id);

    this.actionsDao.addClickAction(ad.id);

    return ad;
  }
}

export default AdService;