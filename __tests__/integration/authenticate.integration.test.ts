import request from 'supertest'
import { app } from '@/app/Server'

describe('Integration test', () => {
  test('Authenticate login success', async () => {
    const user = { email: 'bauer@ctu.us', password: '123456789' }
    const { status, body } = await request(app).post('/v1/auth')
      .send(user).set('Accept', 'application/json')
    expect(status).toBe(200)
    expect(body.statusCode).toBe(200)
    expect(body).toHaveProperty('body')
  })

  test('Authenticate login fail', async () => {
    const user = { email: 'bauer@ctu.us', password: '1234567899' }
    const { status, body } = await request(app).post('/v1/auth')
      .send(user).set('Accept', 'application/json')
    expect(status).toBe(400)
    expect(body.statusCode).toBe(400)
    expect(body.body).toHaveProperty('errorMessage')
    expect(body.body.name).toBe('HttpResponseError')
  })
})
