import request from 'supertest';
import express from 'express';
import { getPackageItems, getPackageItemById, getPackageItemsByUser } from './packageItemController';
import { stubDatabase, restoreDatabase } from '../helpers/controllerHelpers';

const app = express();
app.use(express.json());

app.get('/api/v1/packageitems', getPackageItems);
app.get('/api/v1/packageitems/:id', getPackageItemById);
app.get('/api/v1/packageitems/user/:email', getPackageItemsByUser);

describe('Package Item Controller', () => {
  let stubs;

  beforeAll(() => {
    stubs = stubDatabase();
  });

  afterAll(() => {
    restoreDatabase(stubs);
  });

  describe('GET /api/v1/packageitems', () => {
    it('should return all package items', async () => {
      const mockPackageItems = [
        {
          _id: '1',
          packageName: 'Package 1',
          priority: 'High',
          description: 'Description 1',
          currentStatus: 'In Progress',
          additionalInstructions: 'Handle with care',
          deliveryDetails: {
            deliveryDate: '2023-01-01',
            deliveryTime: '10:00 AM',
            assignedDriver: 'Driver 1',
            trackingNumber: '123456',
          },
        },
      ];

      stubs.packageItemFindStub().exec.resolves(mockPackageItems);

      const res = await request(app).get('/api/v1/packageitems');

      expect(res.status).toBe(200);
    });

    it('should retrun an empty array when packages are not found', async () => {
      stubs.packageItemFindStub().exec.resolves([]);

      const res = await request(app).get('/api/v1/packageitems');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /api/v1/packageitems/:id', () => {
    it('should return a package item by ID', async () => {
      const mockPackageItem = {
        _id: '1',
        packageName: 'Package 1',
        priority: 'High',
        description: 'Description 1',
        currentStatus: 'In Progress',
        additionalInstructions: 'Handle with care',
        deliveryDetails: {
          deliveryDate: '2023-01-01',
          deliveryTime: '10:00 AM',
          assignedDriver: 'Driver 1',
          trackingNumber: '123456',
        },
      };

      stubs.packageItemFindByIdStub.resolves(mockPackageItem);

      const res = await request(app).get('/api/v1/packageitems/1');

      expect(res.status).toBe(200);
    });

    it('should return 404 if package item not found', async () => {
      stubs.packageItemFindByIdStub.resolves(null);

      const res = await request(app).get('/api/v1/packageitems/1');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'Package item not found' });
    });

    it('should handle errors', async () => {
      stubs.packageItemFindByIdStub.rejects(new Error('Server Error'));

      const res = await request(app).get('/api/v1/packageitems/1');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Server Error' });
    });
  });

  describe('GET /api/v1/packageitems/user/:email', () => {
    it('should return package items by user email', async () => {
      const mockUser = {
        _id: '67804adb918b35a7ccbbdc12',
        email: 'test@example.com',
        auth0Id: 'auth0|123456',
      };

      const mockPackageItems = [
        {
          _id: '1',
          packageName: 'Package 1',
          priority: 'High',
          description: 'Description 1',
          currentStatus: 'In Progress',
          additionalInstructions: 'Handle with care',
          customer: '67804adb918b35a7ccbbdc12',
          deliveryDetails: {
            deliveryDate: '2023-01-01',
            deliveryTime: '10:00 AM',
            assignedDriver: 'Driver 1',
            trackingNumber: '123456',
          },
        },
      ];

      stubs.userStub.resolves(mockUser);
      stubs.packageItemFindStub().exec.resolves(mockPackageItems);

      const res = await request(app).get('/api/v1/packageitems/user/test@example.com');

      expect(res.status).toBe(200);
    });

    it('should return 404 if user not found', async () => {
      stubs.userStub.resolves(null);

      const res = await request(app).get('/api/v1/packageitems/user/test@example.com');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'User not found' });
    });

    it('should handle errors', async () => {
      stubs.userStub.rejects(new Error('Server Error'));

      const res = await request(app).get('/api/v1/packageitems/user/test@example.com');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ message: 'Server Error' });
    });
  });
});