import { Test, TestingModule } from '@nestjs/testing';
import { BookDescriptionController } from './book-description.controller';
import { BookDescriptionService } from './book-description.service';

describe('BookController', () => {
    let controller: BookDescriptionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookDescriptionController],
            providers: [BookDescriptionService],
        }).compile();

        controller = module.get<BookDescriptionController>(BookDescriptionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
