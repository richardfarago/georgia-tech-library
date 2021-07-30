import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { book_description_list, book_description_single, create_book_description_dto, isbn, update_book_dto } from '../common/utilities/test-data/book.test-data';
import { BookDescriptionService } from './book-description.service';
import { BookDescription } from './entities/book-description.entity';

describe('BookDescriptionService', () => {
    let service: BookDescriptionService;

    const mock_description_repository = {
        create: jest.fn(() => Promise.resolve(true)),
        save: jest.fn(() => Promise.resolve(true)),
        find: jest.fn(() => Promise.resolve(book_description_list)),
        findOne: jest.fn(() => Promise.resolve(book_description_single)),
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
        it('should create a book description', async () => {
            jest.spyOn(mock_description_repository, 'findOne').mockImplementation(jest.fn(() => Promise.resolve(undefined)));
            jest.spyOn(mock_description_repository, 'create');
            jest.spyOn(mock_description_repository, 'save');
            expect(await service.create(create_book_description_dto)).toBeTruthy();
            expect(mock_description_repository.create).toBeCalledWith(create_book_description_dto);
            expect(mock_description_repository.save).toBeCalled();
        });
    });

    describe('find', () => {
        it('should find all book descriptions', async () => {
            jest.spyOn(mock_description_repository, 'find');
            expect(await service.findAll()).toEqual(book_description_list);
            expect(mock_description_repository.find).toBeCalled();
        });

        it('should find a book description', async () => {
            jest.spyOn(mock_description_repository, 'findOne').mockImplementation(jest.fn(() => Promise.resolve(book_description_single)));
            expect(await service.findOne(isbn)).toEqual(book_description_single);
            expect(mock_description_repository.findOne).toBeCalled();
        });
    });

    describe('update', () => {
        it('should update a book description', async () => {
            jest.spyOn(mock_description_repository, 'update');
            expect(await service.update(isbn, update_book_dto)).toBe(true);
            expect(mock_description_repository.update).toBeCalled();
        });
    });

    describe('remove', () => {
        it('should delete a book description', async () => {
            jest.spyOn(mock_description_repository, 'delete');
            expect(await service.remove(isbn)).toBe(true);
            expect(mock_description_repository.delete).toBeCalled();
        });
    });
});
