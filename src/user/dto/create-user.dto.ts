import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
    // @IsUUID()
    // @IsOptional()
    // id: string

    @IsString()
    username: string;

    @IsString()
    password: string;
}
