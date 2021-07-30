import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest, { SuperTest, Test as AgentTest } from 'supertest';
import { AuthModule } from '../src/auth/auth.module';

let app: INestApplication;
let request: SuperTest<AgentTest>;
let token: string;
const user = {
    username: 'test',
    password: 'password',
};

beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    request = supertest.agent(app.getHttpServer());
});

afterAll(async () => {
    await app?.close();
});

describe('Authentication', () => {
    test('POST: /auth/login', async () => {
        const { status, body } = await request.post('/auth/login').send({ username: user.username, password: user.password });
        expect([200, 201]).toContain(status);
        expect(body).toHaveProperty('access_token');
        token = body.access_token;
    });

    test('GET: /auth/me', async () => {
        const { body } = await request.get('/auth/me').set('Authorization', `Bearer ${token}`).expect(200);
        expect(body).toHaveProperty(user.username, user.password);
    });
})
