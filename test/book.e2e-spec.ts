import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { BookDescription } from '../src/book/entities/book-description.entity';
import { employee_auth } from '../src/common/utilities/test-data/auth.test-data';
import { create_book_description_dto } from '../src/common/utilities/test-data/book.test-data';

describe('R05 - Book', () => {
    let app: INestApplication;

    let book: BookDescription;
    let book_instance_id: string;

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

    describe('R05_C1 - Create book', () => {
        it('R05_C1_01 - Create book', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/book')
                .auth(employee_auth.token, { type: 'bearer' })
                .send(create_book_description_dto)
                .expect(201);
            book = body;
        });

        it('R05_C1_02 - Create book with existing ISBN', () => {
            return request(app.getHttpServer()).post('/book').auth(employee_auth.token, { type: 'bearer' }).send(create_book_description_dto).expect(400);
        });

        it('R05_C1_03 - Create book without author', () => {
            const book_without_author = create_book_description_dto;
            delete book_without_author.authors;
            return request(app.getHttpServer()).post('/book').auth(employee_auth.token, { type: 'bearer' }).send(create_book_description_dto).expect(400);
        });
    });

    describe('R05_C2 - Add book copy', () => {
        it('R05_C2_01 - Add a book instance to the created book', async () => {
            const { body } = await request(app.getHttpServer())
                .post('/book/' + create_book_description_dto.isbn)
                .auth(employee_auth.token, { type: 'bearer' })
                .send({ condition: 7 })
                .expect(201);
            book_instance_id = body.id;
        });
    });

    describe('R05_C3 - Find book by ISBN', () => {
        it('R05_C3_01 - Find created book by ISBN', async () => {
            const { body } = await request(app.getHttpServer())
                .get('/book/' + create_book_description_dto.isbn)
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(200);
            expect(body).not.toEqual({});
        });

        it('R05_C3_02 - Search with invalid ISBN', () => {
            return request(app.getHttpServer()).get('/book/definitely-not-an-isbn').auth(employee_auth.token, { type: 'bearer' }).expect(400);
        });
    });

    describe('R05_C4 - Update book', () => {
        it('R05_C4_01 - Put book to watchlist', () => {
            return request(app.getHttpServer())
                .patch('/book/' + create_book_description_dto.isbn)
                .auth(employee_auth.token, { type: 'bearer' })
                .send({ is_watchlist: true })
                .expect(200);
        });
    });

    describe('R05_C5 - Delete book', () => {
        it('R05_C5_01 - Delete created book', () => {
            return request(app.getHttpServer())
                .delete('/book/' + create_book_description_dto.isbn)
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(200);
        });

        it('R05_C5_02 - Find created book copy', async () => {
            const { body } = await request(app.getHttpServer())
                .get(`/book/${create_book_description_dto.isbn}/${book_instance_id}`)
                .auth(employee_auth.token, { type: 'bearer' })
                .expect(200);
            expect(body).toEqual({});
        });
    });
});
