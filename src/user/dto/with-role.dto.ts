import { IsString } from 'class-validator';

export class UserWithRoleDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}
