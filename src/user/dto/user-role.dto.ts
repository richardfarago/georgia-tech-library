import { IsString, IsUUID } from 'class-validator';

export class UserRoleDto {

    @IsUUID()
    id: string;

    @IsString()
    password: string;

    @IsString()
    username: string;

    @IsString()
    role: string;
}
