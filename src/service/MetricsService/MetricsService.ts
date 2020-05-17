import { IMetricsResponse } from './MetricsResponse';
import { Sequelize, QueryTypes } from 'sequelize';
import { parse, add, format } from 'date-fns';

interface IMetricsService {
  getMetricsForTheDay: (date: string) => Promise<IMetricsResponse>
}

interface IMetricsRecord {
  id: string;
  targetUrl: string;
  clicks: string;
  loads: string;
}

class MetricsService implements IMetricsService {
  constructor(private db: Sequelize) {
  }
  async getMetricsForTheDay(date: string) {
    const parsed = parse(date, 'yyyy-MM-dd', new Date());

    const startDay = format(parsed, 'yyyy-MM-dd');
    const endDay = format(add(parsed, { days: 1 }), 'yyyy-MM-dd');
    const results: IMetricsRecord[] = await this.db.query(`
      SELECT 
        ad.id, 
          ad.targetUrl,
          SUM(case when actions.actionType = 'click' then 1 else 0 end) as clicks,
          SUM(case when actions.actionType = 'load' then 1 else 0 end) as loads
      FROM ad_service.Ads as ad
      LEFT JOIN ad_service.AdActions as actions
      ON ad.id = actions.adId
      WHERE actions.createdAt >= :startDate AND actions.createdAt < :endDate
      GROUP BY
          ad.id;
    `, {
      replacements: {
        startDate: startDay,
        endDate: endDay,
      },
      type: QueryTypes.SELECT
    });
    return Promise.resolve(results);
  }
}

export default MetricsService;

// SELECT 
// 	ad.id, 
//     ad.targetUrl,
//     SUM(case when actions.actionType = 'click' then 1 else 0 end) as clicksCount,
//     SUM(case when actions.actionType = 'load' then 1 else 0 end) as loadsCount
// FROM ad_service.Ads as ad
// LEFT JOIN ad_service.AdActions as actions
// ON ad.id = actions.adId
// WHERE actions.createdAt >= '2020-05-17' AND actions.createdAt < '2020-05-18'
// GROUP BY
//     ad.id;