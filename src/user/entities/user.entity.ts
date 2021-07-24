import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { Employee } from 'src/employee/entities/employee.entity';

import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'AuthUser', schema: 'dbo' })
export class User {
    @ApiProperty({
        example: '00005591-6afb-4c47-b010-e64350bffbd8',
        type: 'string',
        description: 'ID that uniquely identifies a user account',
    })
    @Column('varchar', { primary: true, name: 'id', length: 50 })
    id: string;

    @ApiProperty({
        example: 'nilchenko4r',
        type: 'string',
        description: 'Username for the user account',
    })
    @Column('varchar', { name: 'username', unique: true, length: 50 })
    username: string;

    @ApiProperty({
        example: 'WfE8EowJDnH',
        type: 'string',
        description: 'Password for the user account',
    })
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
