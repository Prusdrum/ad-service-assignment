import AdService from '../../src/service/AdService/AdService';
import { IAdDao } from '../../src/daos/Ads/AdDao';
import { IAdActionDao } from '../../src/daos/Ads/ActionDao';
import ClientAd from '../../src/service/AdService/ClientAd';
import AdEntity from '../../src/entities/Ad';
import sinon from 'sinon';

describe('ad service', () => {
  let adService: AdService;
  const adDao: IAdDao = {
    getById: sinon.stub(),
    getRandomAd: sinon.stub(),
  }
  const adActionDao: IAdActionDao = {
    addClickAction: sinon.stub().resolves(),
    addLoadAction: sinon.stub().resolves(),
  }

  beforeEach(() => {
    adService = new AdService(adDao, adActionDao);
  });

  afterEach(() => {
    (adDao.getById as sinon.SinonStub).reset();
    (adDao.getRandomAd as sinon.SinonStub).reset();
    (adActionDao.addClickAction as sinon.SinonStub).reset();
    (adActionDao.addLoadAction as sinon.SinonStub).reset();
  });

  describe('when load ad is called', () => {
    let loadedAd: ClientAd;
    beforeEach(async () => {
      const ad: AdEntity = new AdEntity('350', 'http://image.url', 'http://company.com');
      (adDao.getRandomAd as sinon.SinonStub).resolves(ad);
      loadedAd = await adService.loadAd();
    });

    it('should load random ad', () => {
      expect(loadedAd.imgUrl).toEqual('http://image.url');
    });

    it('should generate redirect url', () => {
      expect(loadedAd.redirectUrl).toEqual('/api/ads/callback/350');
    });

    it('should add load action', () => {
      expect((adActionDao.addLoadAction as sinon.SinonStub).calledOnceWith('350')).toEqual(true);
    });
  });

  describe('when click ad is called', () => {
    beforeEach(async () => {
      const ad: AdEntity = new AdEntity('350', 'http://image.url', 'http://company.com');
      (adDao.getById as sinon.SinonStub).resolves(ad);
      await adService.adClicked('350');
    });

    it('should add click action', () => {
      expect(
        (adActionDao.addClickAction as sinon.SinonStub).calledOnceWith('350')
      ).toEqual(true);
    });
  });
});