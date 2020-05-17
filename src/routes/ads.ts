import { Request, Response, Router } from 'express';
import AdDao from '@daos/Ads/AdDao';
import AdService from '@service/AdService';
import logger from '@shared/Logger';
import AdActionDao from '@daos/Ads/ActionDao';

const router = Router();
const adDao = new AdDao();
const adActionsDao = new AdActionDao();
const adService = new AdService(adDao, adActionsDao);

router.get('/ads', async (req: Request, res: Response) => {
  const ad = await adService.loadAd();

  res.json({
    url: ad.redirectUrl,
    img: ad.imgUrl
  });
});

router.get('/ads/callback/:id', async (req: Request<{ id: string}>, res: Response) => {
  const ad = await adService.adClicked(req.params.id);

  logger.debug(`ad ${ad.id} clicked`);
  res.redirect(ad.targetUrl);
});

export default router;