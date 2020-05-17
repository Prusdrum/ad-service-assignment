import { Sequelize, QueryTypes } from 'sequelize';
import { AdActionType } from '../Ads/ActionDao';


export interface IMetricsDao {
  getMetricsForTheDay: (from: string, to: string) => Promise<IMetricsRecord[]>
}

export interface IMetricsRecord {
  id: string;
  targetUrl: string;
  clicks: string;
  loads: string;
}

class MetricsDao implements IMetricsDao {
  constructor(private db: Sequelize) {
  }

  async getMetricsForTheDay(from: string, to: string) {
    const results: IMetricsRecord[] = await this.db.query(`
      SELECT 
        ad.id, 
        ad.targetUrl,
        SUM(case when actions.actionType = '${AdActionType.click}' then 1 else 0 end) as clicks,
        SUM(case when actions.actionType = '${AdActionType.load}' then 1 else 0 end) as loads
      FROM 
        ad_service.Ads as ad
      LEFT JOIN 
        ad_service.AdActions as actions
      ON 
        ad.id = actions.adId
      WHERE 
        actions.createdAt >= :startDate AND actions.createdAt < :endDate
      GROUP BY
        ad.id;
    `, {
      replacements: {
        startDate: from,
        endDate: to,
      },
      type: QueryTypes.SELECT
    });

    return results;
  }
}

export default MetricsDao;