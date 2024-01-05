import * as request from 'supertest'
import app from '../app';

describe('App Tests', () => {
  it('should return 200 OK for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, this is your Express server!' });
  });

  it('should return 404 Not Found for an invalid route', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
  });
});
