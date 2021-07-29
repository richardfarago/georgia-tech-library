import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { isDateString } from 'class-validator';
import { find } from 'rxjs';
import { book_id } from 'src/common/helpers/test-data/book.test-data';
import { create_loan_dto, loan_id, loan_list, loan_single } from 'src/common/helpers/test-data/loan.test-data';
import { member_single } from 'src/common/helpers/test-data/member.test-data';
import { user_single } from 'src/common/helpers/test-data/user.test-data';
import { MemberModule } from 'src/member/member.module';
import { MemberService } from 'src/member/member.service';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

describe('LoanService', () => {
    let service: LoanService;

    const mock_loan_repository = {
        query: jest.fn(() => Promise.resolve([])),
        create: jest.fn((dto) => loan_single),
        save: jest.fn((loan) => Promise.resolve(loan)),
        find: jest.fn(() => Promise.resolve(loan_list)),
        findOne: jest.fn((id) => Promise.resolve(loan_single))
    }

    const mock_member_service = {
        findOne: jest.fn((id) => Promise.resolve(member_single))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoanService,
                MemberService,
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

    describe('cretae', () => {
        jest.spyOn(mock_loan_repository, 'create')
        jest.spyOn(mock_loan_repository, 'query')
        jest.spyOn(mock_member_service, 'findOne')
        jest.spyOn(mock_loan_repository, 'save')

        it('should return loan object', async () => {
            expect(await service.create(user_single, create_loan_dto)).toEqual(loan_single)
        })

        it('should contain added fields', async () => {
            const loan: Loan = await service.create(user_single, create_loan_dto)
            expect(loan.id).toEqual(expect.any(String))
            expect(loan.member).toEqual(expect.any(Object))
            expect(loan.start_date).toEqual(expect.any(String))
            expect(loan.end_date).toEqual(expect.any(String))
            expect(loan.due_date).toEqual(expect.any(String))
        })

        it('should make external calls', () => {

            expect(mock_member_service.findOne).toBeCalled()
            expect(mock_loan_repository.create).toBeCalled()
            expect(mock_loan_repository.query).toBeCalled()
            expect(mock_loan_repository.save).toBeCalled()
        })
    })

    describe('find', () => {
        it('should find all loans', async () => {
            expect(await service.findAll()).toEqual(loan_list)
        })

        it('should find one loans', async () => {
            expect(await service.findOne(loan_id)).toEqual(loan_single)
        })

        it('should find loan history for a user', async () => {
            expect(await service.findLoanHistory(user_single)).toEqual(expect.any(Array))
        })

        it('should find active loans for a user', async () => {
            expect(await service.findActiveLoans(user_single)).toEqual(expect.any(Array))
        })
    })

    describe('return', () => {
        it('should return a book', async () => {
            expect(await service.returnBook(loan_id, book_id)).toBeTruthy()
            expect(mock_loan_repository.query).toBeCalled()
        })

        it('should finish a loan', async () => {
            expect(await service.finishLoan(loan_id)).toBeTruthy()
            expect(mock_loan_repository.query).toBeCalled()
        })
    })
});
