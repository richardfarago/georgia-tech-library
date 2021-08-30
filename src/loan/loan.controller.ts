import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DoesExistGuard } from '../common/guards/does-exist.guard';
import { Permissions } from '../rbac/constants/permissions.enum';
import { RequirePermission } from '../rbac/decorators/permission.decorator';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

@Controller('loan')
export class LoanController {
    constructor(private readonly loan_service: LoanService) {}

    @Post()
    @RequirePermission(Permissions.CREATE_LOAN)
    create(@Request() req: any, @Body() create_loan_dto: CreateLoanDto): Promise<Loan> {
        return this.loan_service.create(req.user, create_loan_dto);
    }

    @Get()
    @RequirePermission(Permissions.READ_LOAN)
    findAll(): Promise<Loan[]> {
        return this.loan_service.findAll();
    }

    @Get(':id')
    @RequirePermission(Permissions.READ_LOAN)
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Loan> {
        return this.loan_service.findOne(id);
    }

    @Get('history/all')
    @RequirePermission(Permissions.READ_LOAN)
    findLoanHistory(@Request() req): Promise<any> {
        return this.loan_service.findLoanHistory(req.user);
    }

    @Get('history/active')
    @RequirePermission(Permissions.READ_LOAN)
    findActiveLoans(@Request() req): Promise<any> {
        return this.loan_service.findActiveLoans(req.user);
    }

    @Put(':loan_id/:book_id')
    @UseGuards(new DoesExistGuard(Loan, 'loan_id'))
    @RequirePermission(Permissions.RETURN_BOOK)
    returnBook(@Param('loan_id', ParseUUIDPipe) loan_id: string, @Param('book_id') book_id: string): Promise<any> {
        return this.loan_service.returnBook(loan_id, book_id);
    }

    @Put(':loan_id')
    @UseGuards(new DoesExistGuard(Loan, 'loan_id'))
    @RequirePermission(Permissions.FINISH_LOAN)
    finishLoan(@Param('loan_id', ParseUUIDPipe) loan_id: string): Promise<any> {
        return this.loan_service.finishLoan(loan_id);
    }
}
