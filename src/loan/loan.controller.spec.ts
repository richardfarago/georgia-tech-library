import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

describe('LoanController', () => {
    let controller: LoanController;

    const mock_loan_service = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LoanController],
            providers: [LoanService],
        })
            .overrideProvider(LoanService).useValue(mock_loan_service)
            .compile();

        controller = module.get<LoanController>(LoanController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
