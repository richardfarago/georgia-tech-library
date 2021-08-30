import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { change_pw_auth, login_library_dto, login_student_dto } from '../src/common/utilities/test-data/auth.test-data';

describe('R01 - Authentication', () => {
    let app: INestApplication;
    let token: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app?.close();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    describe('R01_C1 - Not logged in', () => {
        it('R01_C1_01 - Log in with correct credentials', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ username: login_student_dto.username, password: login_student_dto.password })
                .expect(201);
            token = body.access_token;
            expect(body).toHaveProperty('access_token');
            expect(body.access_token).toEqual(expect.any(String));
        });

        it('R01_C1_02 - Log in with correct credentials', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ username: login_library_dto.username, password: login_library_dto.password })
                .expect(201);
            expect(body).toHaveProperty('access_token');
            expect(body.access_token).toEqual(expect.any(String));
        });

        it('R01_C1_03 - Log in with wrong password', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ username: login_student_dto.username, password: 'wrong password' })
                .expect(401);
            expect(body.message).toEqual('Invalid credentials');
        });

        it('R01_C1_04 - Log in with wrong username', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ username: 'wrong username', password: 'wrong password' })
                .expect(401);
            expect(body.message).toEqual('Invalid credentials');
        });
    });

    describe('R01_C2 - Logged in', () => {
        it('R01_C2_01 - Call "get me"', async () => {
            const { body } = await request(app.getHttpServer()).get('/auth/me').auth(token, { type: 'bearer' }).expect(200);
            expect(body).toEqual({
                id: expect.any(String),
                username: login_student_dto.username,
                role: expect.any(String),
            });
        });

        it('R01_C2_02 - Change password', async () => {
            const { body } = await request(app.getHttpServer())
                .put('/auth/password')
                .auth(change_pw_auth.token, { type: 'bearer' })
                .send({ password: 'NEWPASS' })
                .expect(200);
        });
    });
});
