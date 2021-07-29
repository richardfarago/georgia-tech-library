import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { create_book_instance_body, create_book_instance_dto, isbn } from '../../src/common/helpers/test-data/book.test-data';
import { BookInstanceService } from './book-instance.service';
import { BookInstance } from './entities/book-instance.entity';

describe('BookInstanceService', () => {
    let service: BookInstanceService;
    const mock_instance_repository = {
        create: jest.fn((dto) => dto),
        save: jest.fn(() => Promise.resolve(true)),
        delete: jest.fn(() => Promise.resolve(true)),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookInstanceService,
                {
                    provide: getRepositoryToken(BookInstance),
                    useValue: mock_instance_repository
                }
            ],
        }).compile();

        service = module.get<BookInstanceService>(BookInstanceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('add to book', () => {
        it('should create a transform to DTO', async () => {
            expect(await service.create(isbn, create_book_instance_body)).toBe(true)
            expect(mock_instance_repository.create).toBeCalled()
        });

        it('should add UUID', async () => {
            expect(await service.create(isbn, create_book_instance_body)).toBe(true)
            expect(mock_instance_repository.save).toBeCalledWith({
                id: expect.any(String),
                ...create_book_instance_dto
            })
        });
    });

    describe('remove', () => {
        it('should delete a book instance', async () => {
            jest.spyOn(mock_instance_repository, 'delete')
            expect(await service.remove(isbn)).toBe(true)
            expect(mock_instance_repository.delete).toBeCalled()
        });
    });
});
