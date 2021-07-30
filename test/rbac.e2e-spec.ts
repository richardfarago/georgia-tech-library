import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { login_employee_dto, login_employee_manager_dto, login_member_dto } from '../src/common/utilities/test-data/auth.test-data';

describe('R02 - RBAC', () => {
    let app: INestApplication;

    let member_token: string;
    let employee_token: string;
    let employee_manager_token: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        const member_response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: login_member_dto.username, password: login_member_dto.password })
            .expect(201);
        member_token = member_response.body.access_token;

        const employee_response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: login_employee_dto.username, password: login_employee_dto.password })
            .expect(201);
        employee_token = employee_response.body.access_token;

        const employee_manager_response = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: login_employee_manager_dto.username, password: login_employee_manager_dto.password })
            .expect(201);
        employee_manager_token = employee_manager_response.body.access_token;
    });

    afterAll(async () => {
        await app?.close();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    describe('PRE - Verify tokens', () => {
        it('should be a member token', async () => {
            const { body } = await request(app.getHttpServer()).get('/auth/me').auth(member_token, { type: 'bearer' });
            expect(body.role).toEqual('Student');
        });

        it('should be an employee token', async () => {
            const { body } = await request(app.getHttpServer()).get('/auth/me').auth(employee_token, { type: 'bearer' });
            expect(body.role).toEqual('Check-out staff');
        });

        it('should be a chief employee token', async () => {
            const { body } = await request(app.getHttpServer()).get('/auth/me').auth(employee_manager_token, { type: 'bearer' });
            expect(body.role).toEqual('Chief librarian');
        });
    });

    describe('R02_C1 - Unauthorized (no token)', () => {
        it('R02_C1_01 - Call "get me"', () => {
            return request(app.getHttpServer()).get('/auth/me').expect(401);
        });

        it('R02_C1_02 - Call get member', () => {
            return request(app.getHttpServer()).get('/member').expect(401);
        });

        it('R02_C1_03 - Call get employee', () => {
            return request(app.getHttpServer()).get('/employee').expect(401);
        });

        it('R02_C1_04 - Call get book', () => {
            return request(app.getHttpServer()).get('/book').expect(401);
        });

        it('R02_C1_05 - Call get loan', () => {
            return request(app.getHttpServer()).get('/loan').expect(401);
        });
    });

    describe('R02_C2 - Member (token)', () => {
        it('R02_C2_01 - Call "get me"', () => {
            return request(app.getHttpServer()).get('/auth/me').auth(member_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C2_02 - Call get member', () => {
            return request(app.getHttpServer()).get('/member').auth(member_token, { type: 'bearer' }).expect(403);
        });

        it('R02_C2_03 - Call get employee', () => {
            return request(app.getHttpServer()).get('/employee').auth(member_token, { type: 'bearer' }).expect(403);
        });

        it('R02_C2_04 - Call get book', () => {
            return request(app.getHttpServer()).get('/book').auth(member_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C2_05 - Call get loan', () => {
            return request(app.getHttpServer()).get('/loan').auth(member_token, { type: 'bearer' }).expect(200);
        });
    });

    describe('R02_C3 - Employee (token)', () => {
        it('R02_C3_01 - Call "get me"', () => {
            return request(app.getHttpServer()).get('/auth/me').auth(employee_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C3_02 - Call get member', () => {
            return request(app.getHttpServer()).get('/member').auth(employee_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C3_03 - Call get employee', () => {
            return request(app.getHttpServer()).get('/employee').auth(employee_token, { type: 'bearer' }).expect(403);
        });

        it('R02_C3_04 - Call get book', () => {
            return request(app.getHttpServer()).get('/book').auth(employee_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C3_05 - Call get loan', () => {
            return request(app.getHttpServer()).get('/loan').auth(employee_token, { type: 'bearer' }).expect(200);
        });
    });

    describe('R02_C4 - Manager employee (token)', () => {
        it('R02_C4_01 - Call "get me"', () => {
            return request(app.getHttpServer()).get('/auth/me').auth(employee_manager_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C4_02 - Call get member', () => {
            return request(app.getHttpServer()).get('/member').auth(employee_manager_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C4_03 - Call get employee', () => {
            return request(app.getHttpServer()).get('/employee').auth(employee_manager_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C4_04 - Call get book', () => {
            return request(app.getHttpServer()).get('/book').auth(employee_manager_token, { type: 'bearer' }).expect(200);
        });

        it('R02_C4_05 - Call get loan', () => {
            return request(app.getHttpServer()).get('/loan').auth(employee_manager_token, { type: 'bearer' }).expect(200);
        });
    });
});
