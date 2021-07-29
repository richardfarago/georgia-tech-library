import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BookDescriptionService } from './book-description.service';
import { BookDescription } from './entities/book-description.entity';

describe('BookService', () => {
    let service: BookDescriptionService;

    const mock_description_repository = {
        create: jest.fn(() => Promise.resolve(true)),
        save: jest.fn(() => Promise.resolve(true)),
        find: jest.fn(() => Promise.resolve(true)),
        findOne: jest.fn(() => Promise.resolve(true)),
        update: jest.fn(() => Promise.resolve(true)),
        delete: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookDescriptionService,
                {
                    provide: getRepositoryToken(BookDescription),
                    useValue: mock_description_repository,
                },
            ],
        }).compile();

        service = module.get<BookDescriptionService>(BookDescriptionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a book description', () => {});
    });

    describe('find', () => {
        it('should find all book descriptions', () => {});

        it('should find a book description', () => {});
    });

    describe('update', () => {
        it('should update a book description', () => {});
    });

    describe('delete', () => {
        it('should delete a book description', () => {});
    });
});
