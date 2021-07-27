import { IsString, IsUUID } from 'class-validator';

export class JwtUserDto {
    @IsUUID()
    id: string;

    @IsString()
    username: string;

    @IsString()
    role: string;
}
