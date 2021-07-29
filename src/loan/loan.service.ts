import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { User } from 'src/user/entities/user.entity';
import { IsNull, Not, Repository, UpdateResult } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { v4 as uuid } from 'uuid'
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class LoanService {
    constructor(
        @InjectRepository(Loan) private loan_repository: Repository<Loan>,
        @Inject(MemberService) private member_service: MemberService
    ) { }

    async create(user: User, create_loan_dto: CreateLoanDto): Promise<Loan> {
        const member = await this.member_service.findOne(user.id)
        let loan = this.loan_repository.create(create_loan_dto)

        //Check book limit
        let ongoing_loans = await this.loan_repository.query(`SELECT * FROM LoanContent LC WHERE returned_at IS NULL AND loan_id IN (SELECT L.id FROM Member M INNER JOIN Loan L ON L.user_id = M.user_id WHERE M.user_id = '00005591-6afb-4c47-b010-e64350bffbd8')`)
        if (ongoing_loans.length + loan.loan_contents.length > member.loan_permission.book_limit) {
            throw new InternalServerErrorException(`Book limit reached (${ongoing_loans.length + loan.loan_contents.length} > ${member.loan_permission.book_limit})`)
        }

        //Check availability
        let unavailable_books = await this.loan_repository.query(`SELECT * FROM LoanContent LC WHERE book_id IN (${loan.loan_contents.map(obj => `'${obj.book_id}'`)}) AND returned_at IS NULL`)
        if (unavailable_books.length > 0) {
            throw new InternalServerErrorException(`Book(s) currently not available (${unavailable_books.map(obj => `'${obj.book_id}'`)})`)
        }

        //Check loanability
        let unloanable_books = await this.loan_repository.query(`SELECT id as book_id,is_loanable FROM BookInstance BI INNER JOIN BookDescription BD ON BD.isbn=BI.isbn WHERE BI.id IN (${loan.loan_contents.map(obj => `'${obj.book_id}'`)}) AND is_loanable = 0`)
        if (unloanable_books.length > 0) {
            throw new InternalServerErrorException(`Book(s) are not loanable (${unloanable_books.map(obj => `'${obj.book_id}'`)})`)
        }

        //Create loan
        loan.id = uuid()
        loan.member = member
        loan.start_date = moment().format('YYYY-MM-DD HH:mm:ss')
        loan.end_date = moment().add(member.loan_permission.loan_period, 'days').format('YYYY-MM-DD HH:mm:ss')
        loan.due_date = moment().add(member.loan_permission.loan_period + member.loan_permission.grace_period, 'days').format('YYYY-MM-DD HH:mm:ss')
        return this.loan_repository.save(loan)
    }

    findAll(): Promise<Loan[]> {
        return this.loan_repository.find({
            take: 500,
        })
    }

    findOne(id: string): Promise<Loan> {
        return this.loan_repository.findOne(id)
    }

    async findLoanHistory(user: User): Promise<any> {
        return this.loan_repository.query(`SELECT * FROM Loan L INNER JOIN LoanContent LC ON L.id = LC.loan_id WHERE user_id = '${user.id}'`)

    }

    async findActiveLoans(user: User): Promise<any> {
        return this.loan_repository.query(`SELECT * FROM Loan L INNER JOIN LoanContent LC ON L.id = LC.loan_id WHERE user_id = '${user.id}' AND returned_at IS NULL`)
    }

    returnBook(loan_id: string, book_id: string): Promise<UpdateResult> {
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        return this.loan_repository.query(`UPDATE LoanContent SET returned_at = '${now}' WHERE loan_id = '${loan_id}' AND book_id = '${book_id}'`)
    }

    finishLoan(loan_id: string): Promise<UpdateResult> {
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        return this.loan_repository.query(`UPDATE LoanContent SET returned_at = '${now}' WHERE loan_id = '${loan_id}'`)
    }
}
