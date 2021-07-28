import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('EmployeeRole', { schema: 'dbo' })
export class EmployeeRole {
    @Column('varchar', { primary: true, name: 'name' })
    @IsString()
    name: string;
}
