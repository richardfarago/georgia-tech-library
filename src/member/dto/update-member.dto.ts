import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsPhoneNumber, ValidateNested } from 'class-validator';
import { LoanPermission } from '../entities/loan-permission.entity';

export class UpdateMemberDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => LoanPermission)
    loan_permission: Partial<LoanPermission>;

    @IsPhoneNumber()
    phone_number: string;
}
