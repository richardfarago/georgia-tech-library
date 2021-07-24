import { Entity, Column } from 'typeorm';

@Entity({ name: 'LoanPermission', schema: 'dbo' })
export class LoanPermission {
    @Column('varchar', { primary: true, name: 'name', length: 50 })
    name: string;

    @Column('int', { name: 'book_limit' })
    book_limit: string;

    @Column('int', { name: 'loan_period', nullable: true })
    loan_period: number;

    @Column('int', { name: 'grace_period', nullable: true })
    grace_period: number;

    // @OneToMany(type => Member, member => member.loan_permission)
    // members: Member[];
}
