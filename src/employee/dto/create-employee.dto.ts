import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { CreateAddressDto } from 'src/member/entities/address.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmployeeRole } from '../entities/employee-role.entity';

export class CreateEmployeeDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CreateUserDto)
    user: CreateUserDto;

    @IsObject()
    @ValidateNested()
    @Type(() => EmployeeRole)
    role: EmployeeRole;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    home_address: CreateAddressDto;
}
