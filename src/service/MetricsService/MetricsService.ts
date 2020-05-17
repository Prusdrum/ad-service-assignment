import { IMetricsResponse } from './MetricsResponse';
import { parse, add, format } from 'date-fns';
import { IMetricsDao } from '@daos/Metrics/MetricsDao';

interface IMetricsService {
  getMetricsForTheDay: (date: string) => Promise<IMetricsResponse[]>
}

class MetricsService implements IMetricsService {
  constructor(private metricsDao: IMetricsDao) {
  }
  async getMetricsForTheDay(rawDate: string) {
    const startDate = parse(rawDate, 'yyyy-MM-dd', new Date());

    const from = format(startDate, 'yyyy-MM-dd');
    const to = format(add(startDate, { days: 1 }), 'yyyy-MM-dd');

    const results = await this.metricsDao.getMetricsForTheDay(from, to);
    
    return results.map<IMetricsResponse>((result) => ({
      id: result.id,
      clicks: parseInt(result.clicks, 10),
      loads: parseInt(result.loads, 10),
      targetUrl: result.targetUrl,
    }));
  }
}

export default MetricsService;
