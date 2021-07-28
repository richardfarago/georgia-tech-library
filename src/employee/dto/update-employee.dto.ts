import { Type } from 'class-transformer';
import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/member/entities/address.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmployeeRole } from '../entities/employee-role.entity';

export class UpdateEmployeeDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => EmployeeRole)
    role: EmployeeRole;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    home_address: CreateAddressDto;
}
