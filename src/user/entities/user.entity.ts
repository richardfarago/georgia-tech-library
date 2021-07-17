import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Member } from 'src/member/entities/member.entity';

import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'AuthUser', schema: 'dbo' })
export class User {
    @ApiProperty()
    @Column("varchar", { primary: true, name: "id", length: 50 })
    id: string;

    @ApiProperty()
    @Column("varchar", { name: "username", unique: true, length: 50 })
    username: string;

    @ApiProperty()
    @IsOptional()
    @Column("varchar", { name: "password_hash", length: 100 })
    password: string;

    @OneToOne(() => Member, (member) => member.user)
    member: Member;

    // @OneToOne(() => Employee, (employee) => employee.user)
    // employee: Employee;

    // @OneToMany(() => Loan, (loan) => loan.user)
    // loans: Loan[];

}
