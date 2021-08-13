import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { create_lib_dto, create_student_dto, update_member } from '../src/common/utilities/test-data/member.test-data';
import { employee_auth } from '../src/common/utilities/test-data/auth.test-data';
import { Member } from '../src/member/entities/member.entity';
import { non_existent_id } from '../src/common/utilities/test-data/user.test-data';

describe('R03 - Member', () => {
    let app: INestApplication;
    let member_id: string;
    let member: Member;
    let lib_id: string

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

    describe('R03_C1 - Create member', () => {
        it('R03_C1_01 - Create member (student)', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/member')
                .auth(employee_auth.token, { type: 'bearer' })
                .send(create_student_dto)
                .expect(201);
            expect(body).toHaveProperty('user_id');
            member_id = body.user_id;
            member = body;
        });

        it('R03_C1_02 - Create member (library)', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/member')
                .auth(employee_auth.token, { type: 'bearer' })
                .send(create_lib_dto)
                .expect(201);
            expect(body).toHaveProperty('user_id');
            lib_id = body.user_id;
        });

        it('R03_C1_03 - Create member with invalid phone number', async () => {
            const create_member_invalid_phone = create_student_dto;
            create_member_invalid_phone.phone_number = '123';
            request(app.getHttpServer()).post('/member').auth(employee_auth.token, { type: 'bearer' }).send(create_student_dto).expect(400);
        });

        it('R03_C1_04 - Create member with missing user credentials', () => {
            const create_member_invalid_phone = create_student_dto;
            delete create_member_invalid_phone.user;
            request(app.getHttpServer()).post('/member').auth(employee_auth.token, { type: 'bearer' }).send(create_student_dto).expect(400);
        });
    });

    describe('R03_C2 - Find member', () => {
        it('R03_C2_01 - Find created member by ID', async () => {
            const { body } = await request(app.getHttpServer())
                .get('/member/' + member_id)
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(200);
            expect(body).not.toEqual({});
        });
    });

    describe('R03_C3 - Update member', () => {
        it('R03_C3_01 - Update created member: phone number', () => {
            return request(app.getHttpServer())
                .patch('/member/' + member_id)
                .auth(employee_auth.token, { type: 'bearer' })
                .send({ loan_permission: update_member.body.loan_permission })
                .expect(200);
        });

        it('R03_C3_02 - Update created member: loan permission', () => {
            return request(app.getHttpServer())
                .patch('/member/' + member_id)
                .auth(employee_auth.token, { type: 'bearer' })
                .send({ phone_number: update_member.body.phone_number })
                .expect(200);
        });

        it('R03_C3_03 - Update member (non-existent ID)', () => {
            return request(app.getHttpServer())
                .patch('/member/' + non_existent_id) //Valid UUID but does not exist in DB
                .auth(employee_auth.token, { type: 'bearer' })
                .send({ phone_number: update_member.body.phone_number })
                .expect(404);
        });
    });

    describe('R03_C4 - Delete member', () => {
        it('R03_C4_01 - Delete created member by ID', () => {
            return request(app.getHttpServer())
                .delete('/member/' + member_id)
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(200);
        });

        it('R03_C4_02 - Delete created library by ID', () => {
            return request(app.getHttpServer())
                .delete('/member/' + lib_id)
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(200);
        });

        it('R03_C4_03 - Delete member (non-existent ID)', () => {
            return request(app.getHttpServer())
                .delete('/member/' + non_existent_id) //Valid UUID but does not exist in DB
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(404);
        });
    });
});
