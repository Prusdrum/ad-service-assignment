import AdService from '../../src/service/AdService/AdService';
import { IAdDao } from '../../src/daos/Ads/AdDao';
import { IAdActionDao } from '../../src/daos/Ads/ActionDao';
import ClientAd from '../../src/service/AdService/ClientAd';
import AdEntity from '../../src/entities/Ad';

describe('ad service', () => {
  let adService: AdService;
  const adDao: IAdDao = {
    getById: jest.fn(),
    getRandomAd: jest.fn(),
  }
  const adActionDao: IAdActionDao = {
    addClickAction: jest.fn(),
    addLoadAction: jest.fn(),
  }

  beforeEach(() => {
    adService = new AdService(adDao, adActionDao);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when load ad is called', () => {
    let loadedAd: ClientAd;
    beforeEach(async () => {
      const ad: AdEntity = new AdEntity('350', 'http://image.url', 'http://company.com');
      (adDao.getRandomAd as jest.Mock).mockImplementationOnce(() => Promise.resolve(ad));
      loadedAd = await adService.loadAd();
    });

    it('should load random ad', () => {
      expect(loadedAd.imgUrl).toEqual('http://image.url');
    });

    it('should generate redirect url', () => {
      expect(loadedAd.redirectUrl).toEqual('/api/ads/callback/350');
    });

    it('should add load action', () => {
      expect(adActionDao.addLoadAction).toHaveBeenCalledWith('350');
    });
  });

  describe('when click ad is called', () => {
    beforeEach(async () => {
      const ad: AdEntity = new AdEntity('350', 'http://image.url', 'http://company.com');
      (adDao.getById as jest.Mock).mockImplementationOnce(() => Promise.resolve(ad));
      await adService.adClicked('350');
    });

    it('should add click action', () => {
      expect(adActionDao.addClickAction).toHaveBeenCalledWith('350');
    })
  });
});