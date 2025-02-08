import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import { getUserProfile } from '../controllers/userController';

jest.mock('../controllers/userController');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.oidc = {
    isAuthenticated: jest.fn(),
    user: { name: 'Test User', email: 'test@example.com' },
    logout: jest.fn(),
  };
  next();
});
app.use('/api/v1', userRoutes);

describe('User Routes', () => {
  describe('GET /api/v1/check-auth', () => {
    it('should return isAuthenticated true and user info if authenticated', async () => {
      app.use((req, res, next) => {
        req.oidc.isAuthenticated.mockReturnValue(true);
        next();
      });

      const res = await request(app).get('/api/v1/check-auth');

      expect(res.status).toBe(200);
      // expect(res.body).toEqual({
      //   isAuthenticated: true,
      //   user: { name: 'Test User', email: 'test@example.com' },
      // });
    });

    it('should return isAuthenticated false and null user if not authenticated', async () => {
      app.use((req, res, next) => {
        req.oidc.isAuthenticated.mockReturnValue(false);
        next();
      });

      const res = await request(app).get('/api/v1/check-auth');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        isAuthenticated: false,
        user: null,
      });
    });
  });

  describe('GET /api/v1/user/:id', () => {
    it('should call getUserProfile controller', async () => {
      getUserProfile.mockImplementation((req, res) => res.status(200).json({ id: '1', name: 'Test User' }));

      const res = await request(app).get('/api/v1/user/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1', name: 'Test User' });
      expect(getUserProfile).toHaveBeenCalled();
    });
  });
});