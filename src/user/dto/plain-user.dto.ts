import { IsOptional, IsString, IsUUID } from 'class-validator';

export class PlainUserDto {
    @IsUUID()
    id: string;

    @IsString()
    username: string;
}
