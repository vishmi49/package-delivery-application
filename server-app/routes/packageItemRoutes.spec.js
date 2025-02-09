import request from 'supertest';
import express from 'express';
import packageItemRoutes from './packageItemRoutes';
import { createPackageItem, getPackageItems, getPackageItemsByUser, searchPackageItems, updatePackageItem, getPackageItemById } from '../controllers/packageItemController';
import protect from '../middleware/protect';

jest.mock('../controllers/packageItemController');
jest.mock('../middleware/protect');

const app = express();
app.use(express.json());
app.use('/api/v1', packageItemRoutes);

describe('Package Item Routes', () => {
  describe('POST /api/v1/packageitems', () => {
    it('should call createPackageItem controller', async () => {
      createPackageItem.mockImplementation((req, res) => res.status(201).json({ message: 'Package item created' }));

      const res = await request(app)
        .post('/api/v1/packageitems')
        .send({ packageName: 'Test Package' });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({ message: 'Package item created' });
      expect(createPackageItem).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/packageitems', () => {
    it('should call getPackageItems controller', async () => {
      getPackageItems.mockImplementation((req, res) => res.status(200).json([{ id: '1', packageName: 'Test Package' }]));

      const res = await request(app).get('/api/v1/packageitems');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: '1', packageName: 'Test Package' }]);
      expect(getPackageItems).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/packageitems/:id', () => {
    it('should call getPackageItemById controller', async () => {
      getPackageItemById.mockImplementation((req, res) => res.status(200).json({ id: '1', packageName: 'Test Package' }));

      const res = await request(app).get('/api/v1/packageitems/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1', packageName: 'Test Package' });
      expect(getPackageItemById).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/packageitems/user/:email', () => {
    it('should call getPackageItemsByUser controller', async () => {
      getPackageItemsByUser.mockImplementation((req, res) => res.status(200).json([{ id: '1', packageName: 'Test Package' }]));

      const res = await request(app).get('/api/v1/packageitems/user/test@example.com');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: '1', packageName: 'Test Package' }]);
      expect(getPackageItemsByUser).toHaveBeenCalled();
    });
  });

  describe('GET /api/v1/packageitems/search', () => {
    it('should call searchPackageItems controller', async () => {
      searchPackageItems.mockImplementation((req, res) => res.status(200).json([{ id: '1', packageName: 'Test Package' }]));

      const res = await request(app).get('/api/v1/packageitems/search');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1', packageName: 'Test Package' });
    });
  });

  describe('PUT /api/v1/packageitems/:id', () => {
    it('should call updatePackageItem controller with protect middleware', async () => {
      protect.mockImplementation((req, res, next) => next());
      updatePackageItem.mockImplementation((req, res) => res.status(200).json({ message: 'Package item updated' }));

      const res = await request(app)
        .put('/api/v1/packageitems/1')
        .send({ packageName: 'Updated Package' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Package item updated' });
      expect(protect).toHaveBeenCalled();
      expect(updatePackageItem).toHaveBeenCalled();
    });
  });
});