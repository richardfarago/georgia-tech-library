import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

describe('LoanService', () => {
    let service: LoanService;

    const mock_loan_repository = {
        query: jest.fn(() => { }),
        create: jest.fn(() => { })
    }

    const mock_member_service = {
        findOne: jest.fn(() => { })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoanService,
                {
                    provide: getRepositoryToken(Loan),
                    useValue: mock_loan_repository
                },
            ],
        })
            .overrideProvider(MemberService).useValue(mock_member_service)
            .compile();

        service = module.get<LoanService>(LoanService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a loan', () => {
        jest.spyOn(mock_loan_repository, 'create')
        jest.spyOn(mock_loan_repository, 'query')
        jest.spyOn(mock_member_service, 'findOne')
        expect(service.create())
    })
});
