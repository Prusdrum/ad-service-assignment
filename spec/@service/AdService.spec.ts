import AdService from '../../src/service/AdService';
import { IAdDao } from '../../src/daos/Ads/AdDao';
import ClientAd from '../../src/service/model/ClientAd';
import AdEntity from '../../src/entities/Ad';

describe('ad service', () => {
  let adService: AdService;
  const adDao: IAdDao = {
    getById: jest.fn(),
    getRandomAd: jest.fn(),
  }

  beforeEach(() => {
    adService = new AdService(adDao);
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
  });
});