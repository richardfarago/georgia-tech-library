import { Test, TestingModule } from '@nestjs/testing';
import { BookInstanceService } from './book-instance.service';

describe('BookService', () => {
    let service: BookInstanceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookInstanceService],
        }).compile();

        service = module.get<BookInstanceService>(BookInstanceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
