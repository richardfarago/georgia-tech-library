import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entity';
import { LoanContent } from './entities/loan.content';
import { BookInstance } from 'src/book/entities/book-instance.entity';
import { Member } from 'src/member/entities/member.entity';
import { MemberModule } from 'src/member/member.module';

@Module({
    imports: [MemberModule, TypeOrmModule.forFeature([Loan, LoanContent, BookInstance, Member])],
    controllers: [LoanController],
    providers: [LoanService]
})
export class LoanModule { }
