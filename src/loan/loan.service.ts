import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, UpdateResult } from 'typeorm';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { v4 as uuid } from 'uuid';
import * as moment from 'moment';
import * as _ from 'lodash';
import { PlainUserDto } from '../user/dto/plain-user.dto';
import { Member } from '../member/entities/member.entity';
var sem = require('semaphore')(1);

@Injectable()
export class LoanService {
    constructor(
        @InjectConnection() private connection: Connection,
        @InjectRepository(Loan) private loan_repository: Repository<Loan>,
    ) { }

    create(user: PlainUserDto, create_loan_dto: CreateLoanDto): Promise<Loan> {
        return this.connection.transaction("REPEATABLE READ", async (manager) => {
            try {
                const member = await manager.getRepository(Member).findOne(user.id)
                const loan = manager.getRepository(Loan).create(create_loan_dto);

                //Check book limit
                const ongoing_loans = await manager.query(
                    `SELECT * FROM LoanContent LC WHERE returned_at IS NULL AND loan_id IN (SELECT L.id FROM Member M INNER JOIN Loan L ON L.user_id = M.user_id WHERE M.user_id = '${member.user_id}')`,
                );
                if (ongoing_loans.length + loan.loan_contents.length > member.loan_permission.book_limit) {
                    throw new InternalServerErrorException(`Book limit reached.`);
                }

                //Check availability -- NEEDS CONCURRENCY CONTROL
                const unavailable_books = await manager.query(
                    `SELECT * FROM LoanContent LC WHERE book_id IN (${loan.loan_contents.map((obj) => `'${obj.book_id}'`)}) AND returned_at IS NULL`,
                );
                if (unavailable_books.length > 0) {
                    throw new InternalServerErrorException(`Book(s) currently not available.`);
                }

                //Check loanability
                const unloanable_books = await manager.query(
                    `SELECT id as book_id,is_loanable FROM BookInstance BI INNER JOIN BookDescription BD ON BD.isbn=BI.isbn WHERE BI.id IN (${loan.loan_contents.map(
                        (obj) => `'${obj.book_id}'`,
                    )}) AND is_loanable = 0`,
                );
                if (unloanable_books.length > 0) {
                    throw new InternalServerErrorException(`Book(s) are not loanable.`);
                }

                //Create loan
                loan.id = uuid();
                loan.member = member;
                loan.start_date = moment().format('YYYY-MM-DD HH:mm:ss');
                loan.end_date = moment().add(member.loan_permission.loan_period, 'days').format('YYYY-MM-DD HH:mm:ss');
                loan.due_date = moment()
                    .add(member.loan_permission.loan_period + member.loan_permission.grace_period, 'days')
                    .format('YYYY-MM-DD HH:mm:ss');

                console.log('Create loan ' + loan.id)
                await manager.query(`INSERT INTO Loan(id,start_date,end_date,due_date,user_id) VALUES ('${loan.id}','${loan.start_date}','${loan.end_date}','${loan.due_date}','${loan.member.user_id}')`)
                await manager.query(`INSERT INTO LoanContent(book_id, loan_id, returned_at) VALUES ${loan.loan_contents.map((obj) => `('${obj.book_id}','${loan.id}',NULL)`)}`)
                return loan
            } catch (err) {
                throw new InternalServerErrorException(err);
            }
        });
    }

    findAll(): Promise<Loan[]> {
        return this.loan_repository.find({
            take: 500,
        });
    }

    findOne(id: string): Promise<Loan> {
        return this.loan_repository.findOne(id);
    }

    findLoanHistory(user: PlainUserDto): Promise<any> {
        return this.loan_repository.query(`SELECT * FROM Loan L INNER JOIN LoanContent LC ON L.id = LC.loan_id WHERE user_id = '${user.id}'`);
    }

    findActiveLoans(user: PlainUserDto): Promise<any> {
        return this.loan_repository.query(
            `SELECT * FROM Loan L INNER JOIN LoanContent LC ON L.id = LC.loan_id WHERE user_id = '${user.id}' AND returned_at IS NULL`,
        );
    }

    returnBook(loan_id: string, book_id: string): Promise<UpdateResult> {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        return this.loan_repository.query(`UPDATE LoanContent SET returned_at = '${now}' WHERE loan_id = '${loan_id}' AND book_id = '${book_id}'`);
    }

    finishLoan(loan_id: string): Promise<UpdateResult> {
        console.log('Finish loan ' + loan_id)
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        return this.loan_repository.query(`UPDATE LoanContent SET returned_at = '${now}' WHERE loan_id = '${loan_id}'`);
    }
}
