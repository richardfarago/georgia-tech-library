import { Type } from "class-transformer";
import { IsObject, IsOptional, IsPhoneNumber, IsString, ValidateNested } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CreateAddressDto } from "../entities/address.entity";
import { Library } from "../entities/library.entity";
import { LoanPermission } from "../entities/loan-permission.entity";
import { CreateSchoolMemberDto } from "../entities/school-member.entity";

export class CreateMemberDto {

    @IsPhoneNumber()
    phone_number: string;

    // @IsOptional()
    // institution_name: string;

    @IsOptional()
    library: Library;

    @IsObject()
    @ValidateNested()
    @Type(() => LoanPermission)
    loan_permission: LoanPermission;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateSchoolMemberDto)
    school_member: CreateSchoolMemberDto;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    campus_address: CreateAddressDto;
}
