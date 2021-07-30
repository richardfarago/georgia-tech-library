import { IsArray } from "class-validator";
import { LoanContent } from "../entities/loan.content";

export class CreateLoanDto {

    @IsArray()
    loan_contents: Partial<LoanContent>[]
}