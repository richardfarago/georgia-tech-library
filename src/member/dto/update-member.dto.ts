import { IsObject, IsPhoneNumber } from 'class-validator';
import { QueryPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { LoanPermission } from '../entities/loan-permission.entity';

export class UpdateMemberDto {
    @IsObject()
    loan_permission: QueryPartialEntity<LoanPermission>;

    @IsPhoneNumber()
    phone_number: string;
}
