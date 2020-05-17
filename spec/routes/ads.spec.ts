import sequelize, { AdModel, IAdModel } from '../../src/daos/sequelize';
import { Sequelize } from 'sequelize';
//@ts-ignore
import runMigration1 from '../../migrations/20200516182442-create-ad';
//@ts-ignore
import runMigration2 from '../../migrations/20200516222442-create-action';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../src/Server';

describe('ads route', () => {
  let agent: SuperTest<Test>;
  let createdId: string;

  beforeAll(async () => {
    await runMigration1.up(sequelize.getQueryInterface(), Sequelize);
    await runMigration2.up(sequelize.getQueryInterface(), Sequelize);

    const created = await AdModel.create({
      imgUrl: 'https://placeholder.com',
      targetUrl: 'https://cloudinary.com'
    } as IAdModel);
    createdId = created.id;
    agent = supertest(app);
  });
  
  it('should call ads service', (done) => {
    agent.get('/api/ads')
      .expect(200, (err, res) => {
        expect(res.body).toEqual({
          img: 'https://placeholder.com',
          url: `/api/ads/callback/${createdId}`
        });
        done();
      })
  });
});