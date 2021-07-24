import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';
import { Address } from './address.entity';

@Entity({ name: 'SchoolMember', schema: 'dbo' })
export class SchoolMember {
    @Column('char', { primary: true, name: 'ssn', length: 11 })
    ssn: string;

    @Column('varchar', { name: 'first_name', length: 50 })
    first_name: string;

    @Column('varchar', { name: 'last_name', length: 50 })
    last_name: string;

    @ManyToOne(() => Address, { eager: true })
    @JoinColumn([{ name: 'home_address_id', referencedColumnName: 'id' }])
    home_address: Address;
}
