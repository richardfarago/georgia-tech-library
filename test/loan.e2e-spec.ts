import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Member } from '../src/member/entities/member.entity';
import { chief_auth, library_auth, professor_auth, student_auth } from '../src/common/utilities/test-data/auth.test-data';
import {
    create_loan_bundle_library,
    create_loan_bundle_limit_reached,
    create_loan_bundle_professor,
    create_loan_bundle_student,
    create_loan_bundle_unavailable_book,
    create_loan_bundle_unloanable_book,
} from '../src/common/utilities/test-data/loan.test-data';
import * as moment from 'moment';
import { non_existent_id } from '../src/common/utilities/test-data/user.test-data';

describe('R06 - Loan', () => {
    let app: INestApplication;

    let student: Member;
    let student_loan_id: string;

    let professor: Member;
    let professor_loan_id: string;

    let library: Member;
    let library_loan_id: string;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        //Student PRE -> 0 active loans
        const student_response = await request(app.getHttpServer())
            .get('/member/' + student_auth.id)
            .auth(chief_auth.token, { type: 'bearer' });
        student = student_response.body;
        //Prof PRE -> 0 active loans
        const professor_response = await request(app.getHttpServer())
            .get('/member/' + professor_auth.id)
            .auth(chief_auth.token, { type: 'bearer' });
        professor = professor_response.body;
        //Lib PRE -> 0 active loans
        const library_response = await request(app.getHttpServer())
            .get('/member/' + library_auth.id)
            .auth(chief_auth.token, { type: 'bearer' });
        library = library_response.body;
    });

    afterAll(async () => {
        await app?.close();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    describe('R06_C0 - PRE - Find active loans', () => {
        it('R06_C0_01 - Find active loans (Student) - Should have 0 active', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(student_auth.token, { type: 'bearer' });
            expect(body).toEqual([]);
        });

        it('R06_C0_02 - Find acitve loan (Professor) - Should have 0 active', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(professor_auth.token, { type: 'bearer' });
            expect(body).toEqual([]);
        });

        it('R06_C0_03 - Find acitve loan (Library) - Should have 0 active', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(library_auth.token, { type: 'bearer' });
            expect(body).toEqual([]);
        });
    });

    describe('R06_C1 - Create loan', () => {
        it('R06_C1_01 - Create loan (Student)', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/loan')
                .auth(student_auth.token, { type: 'bearer' })
                .send(create_loan_bundle_student)
                .expect(201);
            student_loan_id = body.id;
        });

        it('R06_C1_02 - Create loan (Professor)', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/loan')
                .auth(professor_auth.token, { type: 'bearer' })
                .send(create_loan_bundle_professor)
                .expect(201);
            professor_loan_id = body.id;
        });

        it('R06_C1_03 - Create loan (Library)', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/loan')
                .auth(library_auth.token, { type: 'bearer' })
                .send(create_loan_bundle_library)
                .expect(201);
            library_loan_id = body.id;
        });

        it('R06_C1_04 - Create loan exceed book limit', () => {
            return request(app.getHttpServer())
                .post('/loan')
                .auth(student_auth.token, { type: 'bearer' })
                .send(create_loan_bundle_limit_reached)
                .expect(500)
                .expect('{"statusCode":500,"message":"Book limit reached.","error":"Internal Server Error"}');
        });

        it('R06_C1_05 - Create loan with unavailable book instance', () => {
            return request(app.getHttpServer())
                .post('/loan')
                .auth(student_auth.token, { type: 'bearer' })
                .send(create_loan_bundle_unavailable_book)
                .expect(500)
                .expect('{"statusCode":500,"message":"Book(s) currently not available.","error":"Internal Server Error"}');
        });

        it('R06_C1_06 - Create loan with unloanable book title', () => {
            return request(app.getHttpServer())
                .post('/loan')
                .auth(student_auth.token, { type: 'bearer' })
                .send(create_loan_bundle_unloanable_book)
                .expect(500)
                .expect('{"statusCode":500,"message":"Book(s) are not loanable.","error":"Internal Server Error"}');
        });
    });

    describe('R06_C2 - Find active loans', () => {
        it('R06_C2_01 - Find active loans (Student) - should have one active (4 books)', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(student_auth.token, { type: 'bearer' });
            expect(body.length).toEqual(create_loan_bundle_student.loan_contents.length);
        });

        it('R06_C2_02 - Find acitve loan (Professor) - should have one active (5 books)', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(professor_auth.token, { type: 'bearer' });
            expect(body.length).toEqual(create_loan_bundle_professor.loan_contents.length);
        });

        it('R06_C2_03 - Find acitve loan (Library) - should have one active (10 books)', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(library_auth.token, { type: 'bearer' });
            expect(body.length).toEqual(create_loan_bundle_library.loan_contents.length);
        });
    });

    describe('R06_C3 - Validate loan permissions (end date/due date)', () => {
        it('R06_C3_01 - Student (21 days loan period & 7 days grace period)', async () => {
            const { body } = await request(app.getHttpServer())
                .get(`/loan/${student_loan_id}`)
                .auth(student_auth.token, { type: 'bearer' })
                .expect(200);

            const loan_period = moment(body.end_date).diff(moment(body.start_date), 'days');
            const grace_period = moment(body.due_date).diff(moment(body.end_date), 'days');
            expect(loan_period).toEqual(student.loan_permission.loan_period);
            expect(grace_period).toEqual(student.loan_permission.grace_period);
        });

        it('R06_C3_02 - Professor (90 days loan period & 14 days grace period)', async () => {
            const { body } = await request(app.getHttpServer())
                .get(`/loan/${professor_loan_id}`)
                .auth(professor_auth.token, { type: 'bearer' })
                .expect(200);

            const loan_period = moment(body.end_date).diff(moment(body.start_date), 'days');
            const grace_period = moment(body.due_date).diff(moment(body.end_date), 'days');
            expect(loan_period).toEqual(professor.loan_permission.loan_period);
            expect(grace_period).toEqual(professor.loan_permission.grace_period);
        });

        it('R06_C3_03 - Library (100 days loan period & 70 days grace period)', async () => {
            const { body } = await request(app.getHttpServer())
                .get(`/loan/${library_loan_id}`)
                .auth(library_auth.token, { type: 'bearer' })
                .expect(200);

            const loan_period = moment(body.end_date).diff(moment(body.start_date), 'days');
            const grace_period = moment(body.due_date).diff(moment(body.end_date), 'days');
            expect(loan_period).toEqual(library.loan_permission.loan_period);
            expect(grace_period).toEqual(library.loan_permission.grace_period);
        });
    });

    describe('R06_C4 - Return books', () => {
        it('R06_C4_01 - Return books (Student)', async () => {
            const promises = [];

            for (let i = 0; i < create_loan_bundle_student.loan_contents.length; i++) {
                promises.push(
                    request(app.getHttpServer())
                        .put(`/loan/${student_loan_id}/${create_loan_bundle_student.loan_contents[i].book_id}`)
                        .auth(student_auth.token, { type: 'bearer' })
                        .expect(200),
                );
            }

            await Promise.all(promises);
        });

        it('R06_C4_02 - Return books (Professor)', async () => {
            const promises = [];

            for (let i = 0; i < create_loan_bundle_professor.loan_contents.length; i++) {
                promises.push(
                    request(app.getHttpServer())
                        .put(`/loan/${professor_loan_id}/${create_loan_bundle_professor.loan_contents[i].book_id}`)
                        .auth(professor_auth.token, { type: 'bearer' })
                        .expect(200),
                );
            }

            await Promise.all(promises);
        });

        it('R06_C4_03 - Return books (Library)', async () => {
            await request(app.getHttpServer()).put(`/loan/${library_loan_id}`).auth(library_auth.token, { type: 'bearer' }).expect(200);
        });

        it('R05_C4_04 - Return book (non-existent loan ID)', async () => {
            await request(app.getHttpServer()).put(`/loan/${non_existent_id}`).auth(library_auth.token, { type: 'bearer' }).expect(404);
        });
    });

    describe('R06_C5 - POST - Find active loans', () => {
        it('R06_C5_01 - Find active loans (Student) - Should have 0 active', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(student_auth.token, { type: 'bearer' });
            expect(body).toEqual([]);
        });

        it('R06_C5_02 - Find acitve loan (Professor) - Should have 0 active', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(professor_auth.token, { type: 'bearer' });
            expect(body).toEqual([]);
        });

        it('R06_C5_03 - Find acitve loan (Library) - Should have 0 active', async () => {
            const { body } = await request(app.getHttpServer()).get('/loan/history/active').auth(library_auth.token, { type: 'bearer' });
            expect(body).toEqual([]);
        });
    });
});
