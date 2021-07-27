import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { Employee } from 'src/employee/entities/employee.entity';

import { IsOptional } from 'class-validator';

@Entity({ name: 'AuthUser', schema: 'dbo' })
export class User {

    @Column('varchar', { primary: true, name: 'id', length: 50 })
    id: string;


    @Column('varchar', { name: 'username', unique: true, length: 50 })
    username: string;


    @IsOptional()
    @Column('varchar', { name: 'password_hash', length: 100 })
    password: string;

    @OneToOne(() => Member, (member) => member.user)
    member: Member;

    @OneToOne(() => Employee, (employee) => employee.user)
    employee: Employee;

    // @OneToMany(() => Loan, (loan) => loan.user)
    // loans: Loan[];
}
