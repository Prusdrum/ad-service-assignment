import { Request, Response, Router } from 'express';
import AdDao from '@daos/Ads/AdDao';
import AdService from '@service/AdService/AdService';
import logger from '@shared/Logger';
import AdActionDao from '@daos/Ads/ActionDao';
import sequelize from '@daos/sequelize';
import MetricsService from '@service/MetricsService/MetricsService';

const router = Router();
const adDao = new AdDao();
const adActionsDao = new AdActionDao();
const adService = new AdService(adDao, adActionsDao);
const metricsService = new MetricsService(sequelize);

router.get('/ads', async (req: Request, res: Response) => {
  const ad = await adService.loadAd();

  res.json({
    url: ad.redirectUrl,
    img: ad.imgUrl
  });
});

type IAdsCallbackRouteParam = { 
  id: string;
}

router.get('/ads/callback/:id', async (req: Request<IAdsCallbackRouteParam>, res: Response) => {
  const ad = await adService.adClicked(req.params.id);

  logger.debug(`ad ${ad.id} clicked`);
  res.redirect(ad.targetUrl);
});

type IAdsMetricsRouteParam = {
  date: string;
}

router.get('/ads/metrics/:date', async (req: Request<IAdsMetricsRouteParam>, res: Response) => {
  const metrics = await metricsService.getMetricsForTheDay(req.params.date);
  res.json(metrics);
});

export default router;