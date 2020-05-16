import { Request, Response, Router } from 'express';
import AdDao from '@daos/Ads/AdDao';
import AdService from '@service/AdService';
import logger from '@shared/Logger';

const router = Router();
const adDao = new AdDao();
const adService = new AdService(adDao);

router.get('/ads', async (req: Request, res: Response) => {
  const ad = adService.loadAd();

  res.json({
    url: ad.redirectUrl,
    img: ad.imgUrl
  });
});

router.get('/ads/callback/:id', async (req: Request<{ id: string}>, res: Response) => {
  const ad = adService.adClicked(req.params.id);

  logger.debug(`ad ${ad.id} clicked`);
  res.redirect(ad.targetUrl);
});

export default router;