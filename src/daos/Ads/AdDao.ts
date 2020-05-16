import Ad, { IAd } from '@entities/Ad';

export interface IAdDao {
  getRandomAd: () => IAd;
  getById: (id: string) => IAd;
}

class AdDao implements IAdDao {
  getRandomAd() {
    return new Ad(Math.floor((Math.random() * 1000)).toString(), '', '');
  }

  getById(id: string) {
    return new Ad(id, '', '');
  }
}

export default AdDao;