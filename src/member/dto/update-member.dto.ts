import { PartialType } from '@nestjs/swagger';
import { IsPhoneNumber, IsString } from 'class-validator';
import { LoanPermission } from '../entities/loan-permission.entity';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto {
    @IsString()
    loan_permission: LoanPermission;

    @IsPhoneNumber()
    phone_number: string;
}
