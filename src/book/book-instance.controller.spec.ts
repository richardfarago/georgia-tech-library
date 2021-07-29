import { Test, TestingModule } from '@nestjs/testing';
import { BookInstanceService } from './book-instance.service';
import { BookInstanceController } from './book-instance.controller';

describe('BookController', () => {
    let controller: BookInstanceController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookInstanceController],
            providers: [BookInstanceService],
        }).compile();

        controller = module.get<BookInstanceController>(BookInstanceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
