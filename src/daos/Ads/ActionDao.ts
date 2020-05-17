export interface IAdActionDao {
  addLoadAction: (adId: string) => Promise<void>;
  addClickAction: (adId: string) => Promise<void>;
}

class AdActionDao implements IAdActionDao {
  addClickAction(adId: string) {
    return Promise.resolve();
  }

  addLoadAction(adId: string) {
    return Promise.resolve();
  }
}

export default AdActionDao;