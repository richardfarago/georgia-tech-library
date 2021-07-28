import { IsOptional } from 'class-validator';
import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { LoanPermission } from './loan-permission.entity';
import { MemberCard } from './member-card.entity';
import { SchoolMember } from './school-member.entity';
import { Address } from './address.entity';
import { Library } from './library.entity';

@Entity({ name: 'Member', schema: 'dbo' })
export class Member {
    @Column('varchar', { primary: true, name: 'user_id', length: 50 })
    user_id: string;

    @Column('varchar', { name: 'phone_number', length: 50 })
    phone_number: string;

    // @IsOptional()
    // @Column()
    // institution_name: string;

    @IsOptional()
    @OneToOne(() => Library, { cascade: true, eager: true })
    @JoinColumn({ name: 'institution_name', referencedColumnName: 'name' })
    library: Library;

    @OneToOne(() => User, { cascade: true }) //{ eager: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @IsOptional()
    @OneToOne(() => SchoolMember, { cascade: true })
    @JoinColumn({ name: 'ssn', referencedColumnName: 'ssn' })
    school_member: SchoolMember;

    @OneToOne(() => MemberCard, { cascade: true })
    @JoinColumn({ name: 'card_number', referencedColumnName: 'number' })
    member_card: MemberCard;

    @ManyToOne(() => LoanPermission, { cascade: true })
    @JoinColumn({ name: 'loan_permission', referencedColumnName: 'name' })
    loan_permission: LoanPermission;

    @ManyToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn({ name: 'campus_address_id', referencedColumnName: 'id' })
    campus_address: Address;
}
