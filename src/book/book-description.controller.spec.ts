import { Test, TestingModule } from '@nestjs/testing';
import { BookDescriptionController } from './book-description.controller';
import { BookDescriptionService } from './book-description.service';

describe('BookDescriptionController', () => {
    let controller: BookDescriptionController;

    const mock_description_service = {

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookDescriptionController],
            providers: [BookDescriptionService],
        })
            .overrideProvider(BookDescriptionService).useValue(mock_description_service)
            .compile();

        controller = module.get<BookDescriptionController>(BookDescriptionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
