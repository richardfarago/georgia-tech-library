import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: 'MemberCard', schema: 'dbo' })
export class MemberCard {

    @PrimaryColumn()
    number: string;

    @Column()
    photo_url: string;

    @Column()
    issuedAt: Date;
}
