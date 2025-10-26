import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod;
let app;
let token;

const getValidObjectId = () => new mongoose.Types.ObjectId().toString();

describe('FlexiSite API E2E', function () {
  this.timeout(60000);

  before(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongod.getUri();
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

    // dynamic import after env is set so app connects to in-memory mongo
    const mod = await import('../app.js');
    app = mod.default;
    // Ensure indexes (unique constraints) are built before running tests
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.syncIndexes();
    }
  });

  after(async () => {
    await mongoose.connection.dropDatabase().catch(() => {});
    await mongoose.connection.close().catch(() => {});
    if (mongod) await mongod.stop();
  });

  describe('Auth', () => {
    it('registers an admin user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'admin', password: 'Passw0rd!' });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('message');
    });

    it('fails to register duplicate user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'admin', password: 'Passw0rd!' });
      expect(res.status).to.equal(400);
    });

    it('logs in with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'Passw0rd!' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      token = res.body.token;
    });

    it('rejects invalid login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'wrong' });
      expect(res.status).to.equal(400);
    });
  });

  describe('Pages', () => {
    let pageId;

    it('rejects create without token', async () => {
      const res = await request(app)
        .post('/api/pages')
        .send({ title: 'Home', slug: 'home', sections: [] });
      expect(res.status).to.equal(401);
    });

    it('creates a page with token', async () => {
      const res = await request(app)
        .post('/api/pages')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Home',
          slug: 'home',
          sections: [
            { type: 'hero', heading: 'Welcome', content: 'Hello' },
          ],
          meta: { description: 'Homepage', keywords: ['home'] },
        });
      expect(res.status).to.equal(201);
      pageId = res.body._id;
    });

    it('lists pages', async () => {
      const res = await request(app).get('/api/pages');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('gets page by slug', async () => {
      const res = await request(app).get('/api/pages/slug/home');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('slug', 'home');
    });

    it('gets page by id', async () => {
      const res = await request(app).get(`/api/pages/${pageId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id', pageId);
    });

    it('updates page by id with token', async () => {
      const res = await request(app)
        .put(`/api/pages/${pageId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Homepage' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'Homepage');
    });

    it('rejects creating a page with duplicate slug', async () => {
      const res = await request(app)
        .post('/api/pages')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Another', slug: 'home', sections: [] });
      expect(res.status).to.equal(400);
    });

    it('returns 400 for non-existing page id', async () => {
      const res = await request(app)
        .get(`/api/pages/${getValidObjectId()}`);
      expect(res.status).to.equal(400);
    });

    it('deletes page with token', async () => {
      const res = await request(app)
        .delete(`/api/pages/${pageId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });
  });

  describe('Services', () => {
    let serviceId;

    it('rejects create without token', async () => {
      const res = await request(app)
        .post('/api/services')
        .send({ name: 'Web Dev' });
      expect(res.status).to.equal(401);
    });

    it('creates service with token', async () => {
      const res = await request(app)
        .post('/api/services')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Web Dev', description: 'Sites', price: 100 });
      expect(res.status).to.equal(201);
      serviceId = res.body._id;
    });

    it('lists services', async () => {
      const res = await request(app).get('/api/services');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('gets service by id', async () => {
      const res = await request(app).get(`/api/services/${serviceId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id', serviceId);
    });

    it('updates service by id with token', async () => {
      const res = await request(app)
        .put(`/api/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ price: 150 });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('price', 150);
    });

    it('deletes service with token', async () => {
      const res = await request(app)
        .delete(`/api/services/${serviceId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });
  });

  describe('Messages', () => {
    let messageId;

    it('submits public message', async () => {
      const res = await request(app)
        .post('/api/messages')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Hello',
          message: 'I would like a website.',
        });
      expect(res.status).to.equal(201);
      messageId = res.body._id;
    });

    it('rejects admin list without token', async () => {
      const res = await request(app).get('/api/messages');
      expect(res.status).to.equal(401);
    });

    it('lists messages with token', async () => {
      const res = await request(app)
        .get('/api/messages')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.greaterThan(0);
    });

    it('gets message by id with token', async () => {
      const res = await request(app)
        .get(`/api/messages/${messageId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id', messageId);
    });

    it('marks message read and unread', async () => {
      const res1 = await request(app)
        .patch(`/api/messages/${messageId}/read`)
        .set('Authorization', `Bearer ${token}`)
        .send({ isRead: true });
      expect(res1.status).to.equal(200);
      expect(res1.body).to.have.property('isRead', true);

      const res2 = await request(app)
        .patch(`/api/messages/${messageId}/read`)
        .set('Authorization', `Bearer ${token}`)
        .send({ isRead: false });
      expect(res2.status).to.equal(200);
      expect(res2.body).to.have.property('isRead', false);
    });

    it('deletes message with token', async () => {
      const res = await request(app)
        .delete(`/api/messages/${messageId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });
  });

  describe('Settings', () => {
    it('gets settings (empty object initially)', async () => {
      const res = await request(app).get('/api/settings');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
    });

    it('rejects update without token', async () => {
      const res = await request(app).put('/api/settings').send({ siteName: 'MySite' });
      expect(res.status).to.equal(401);
    });

    it('updates settings with token (upsert)', async () => {
      const res = await request(app)
        .put('/api/settings')
        .set('Authorization', `Bearer ${token}`)
        .send({ siteName: 'FlexiSite Test', contactEmail: 'owner@example.com' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('siteName', 'FlexiSite Test');
      expect(res.body).to.have.property('contactEmail', 'owner@example.com');
    });

    it('gets updated settings', async () => {
      const res = await request(app).get('/api/settings');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('siteName', 'FlexiSite Test');
    });
  });
});
