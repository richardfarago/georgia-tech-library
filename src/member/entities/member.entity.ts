import { IsOptional } from 'class-validator';
import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { LoanPermission } from './loan-permission.entity';
import { MemberCard } from './member-card.entity';
import { SchoolMember } from './school-member.entity';
import { Address } from './address.entity';

@Entity({ name: 'Member', schema: 'dbo' })
export class Member {
    @Column('varchar', { primary: true, name: 'user_id', length: 50 })
    userId: string;

    @Column('varchar', { name: 'phone_number', length: 50 })
    phoneNumber: string;

    @Column()
    campus_address_id: string;

    @IsOptional()
    @Column()
    institution_name: string;

    @OneToOne(() => User) //{ eager: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @OneToOne(() => SchoolMember)
    @JoinColumn({ name: 'ssn', referencedColumnName: 'ssn' })
    school_member: SchoolMember;

    @OneToOne(() => MemberCard)
    @JoinColumn({ name: 'card_number', referencedColumnName: 'number' })
    member_card: MemberCard;

    @ManyToOne(() => LoanPermission)
    @JoinColumn({ name: 'loan_permission', referencedColumnName: 'name' })
    loan_permission: LoanPermission;

    @ManyToOne(() => Address)
    @JoinColumn({ name: 'campus_address_id', referencedColumnName: 'id' })
    campus_address: Address;
}
