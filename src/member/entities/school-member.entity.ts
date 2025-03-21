import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';
import { Address, CreateAddressDto } from './address.entity';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@Entity({ name: 'SchoolMember', schema: 'dbo' })
export class SchoolMember {
    @Column('char', { primary: true, name: 'ssn', length: 11 })
    ssn: string;

    @Column('varchar', { name: 'first_name', length: 50 })
    first_name: string;

    @Column('varchar', { name: 'last_name', length: 50 })
    last_name: string;

    @ManyToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn([{ name: 'home_address_id', referencedColumnName: 'id' }])
    home_address: Address;
}

export class CreateSchoolMemberDto {
    @IsString()
    ssn: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDto)
    home_address: CreateAddressDto;
}
