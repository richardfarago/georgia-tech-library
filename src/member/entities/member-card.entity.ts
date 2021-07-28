import { IsDateString, IsString, isURL, IsUrl } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'MemberCard', schema: 'dbo' })
export class MemberCard {
    @IsString()
    @PrimaryColumn()
    number: string;

    @IsUrl()
    @Column()
    photo_url: string;

    @IsDateString()
    @Column()
    issuedAt: Date;
}
