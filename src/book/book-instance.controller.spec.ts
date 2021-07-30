import { Test, TestingModule } from '@nestjs/testing';
import { BookInstanceService } from './book-instance.service';
import { BookInstanceController } from './book-instance.controller';

describe('BookInstanceController', () => {
    let controller: BookInstanceController;

    const mock_instance_service = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookInstanceController],
            providers: [BookInstanceService],
        })
            .overrideProvider(BookInstanceService)
            .useValue(mock_instance_service)
            .compile();

        controller = module.get<BookInstanceController>(BookInstanceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
