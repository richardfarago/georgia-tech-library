import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {

    @PrimaryColumn('uuid')
    @IsOptional()
    @IsUUID()
    id: string;

    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;
}
