import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { chief_auth } from '../src/common/utilities/test-data/auth.test-data';
import { create_employee_dto, update_employee } from '../src/common/utilities/test-data/employee.test-data';
import { Employee } from '../src/employee/entities/employee.entity';
import { non_existent_id } from '../src/common/utilities/test-data/user.test-data';

describe('R04 - Employee', () => {
    let app: INestApplication;
    let employee_id: string;
    let employee: Employee;

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

    describe('R04_C1 - Create employee', () => {
        it('R04_C1_01 - Create employee (Check-out staff)', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/employee')
                .auth(chief_auth.token, { type: 'bearer' })
                .send(create_employee_dto)
                .expect(201);
            expect(body).toHaveProperty('user_id');
            employee_id = body.user_id;
            employee = body;
        });
    });

    describe('R04_C2 - Find employee', () => {
        it('R04_C2_01 - Find created employee', async () => {
            const { body } = await request(app.getHttpServer())
                .get('/employee/' + employee_id)
                .auth(chief_auth.token, { type: 'bearer' })
                .expect(200);
            expect(body).not.toEqual({});
        });
    });

    describe('R04_C3 - Update employee', () => {
        it('R04_C3_01 - Promote created employee (to be Library assistant)', () => {
            return request(app.getHttpServer())
                .patch('/employee/' + employee_id)
                .auth(chief_auth.token, { type: 'bearer' })
                .send(update_employee.body)
                .expect(200);
        });

        it('R04_C3_02 - Update employee (non-existent ID)', () => {
            return request(app.getHttpServer())
                .patch('/employee/' + non_existent_id)
                .auth(chief_auth.token, { type: 'bearer' })
                .send(update_employee.body)
                .expect(404);
        });
    });

    describe('R04_C4 - Delete employee', () => {
        it('R04_C4_01 - Fire employee', () => {
            return request(app.getHttpServer())
                .delete('/employee/' + employee_id)
                .auth(chief_auth.token, { type: 'bearer' })
                .expect(200);
        });

        it('R04_C4_02 - Delete employee (non-existent ID)', () => {
            return request(app.getHttpServer())
                .delete('/employee/' + non_existent_id)
                .auth(chief_auth.token, { type: 'bearer' })
                .expect(404);
        });
    });
});
