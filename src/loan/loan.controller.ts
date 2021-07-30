import { Body, Controller, Get, Param, Post, Put, Request } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
    constructor(private readonly loan_service: LoanService) {}

    @Post()
    create(@Request() req: any, @Body() create_loan_dto: CreateLoanDto): Promise<Loan> {
        return this.loan_service.create(req.user, create_loan_dto);
    }

    @Get()
    findAll(): Promise<Loan[]> {
        return this.loan_service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Loan> {
        return this.loan_service.findOne(id);
    }

    @Get('history/all')
    findLoanHistory(@Request() req): Promise<any> {
        return this.loan_service.findLoanHistory(req.user);
    }

    @Get('history/active')
    findActiveLoans(@Request() req): Promise<any> {
        return this.loan_service.findActiveLoans(req.user);
    }

    @Put(':loan_id/:book_id')
    returnBook(@Param('loan_id') loan_id: string, @Param('book_id') book_id: string): Promise<any> {
        return this.loan_service.returnBook(loan_id, book_id);
    }

    @Put(':loan_id')
    finishLoan(@Param('loan_id') loan_id: string): Promise<any> {
        return this.loan_service.finishLoan(loan_id);
    }
}
