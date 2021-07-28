import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;
}
