import { IsArray } from "class-validator";
import { BookInstance } from "src/book/entities/book-instance.entity";
import { LoanContent } from "../entities/loan.content";

export class CreateLoanDto {

    @IsArray()
    loan_contents: Partial<LoanContent>[]
}