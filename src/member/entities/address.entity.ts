import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { City } from './city.entity';

@Entity('Address', { schema: 'dbo' })
export class Address {
    @Column('varchar', { primary: true, name: 'id', length: 50 })
    id: string;

    @Column('varchar', { name: 'street', length: 100 })
    street: string;

    @Column('varchar', { name: 'house_number', length: 50 })
    house_number: string;

    @ManyToOne(() => City, { cascade: true, eager: true })
    @JoinColumn({ name: 'zip', referencedColumnName: 'zip' })
    city: City;
}

export class CreateAddressDto {
    @IsString()
    street: string;

    @IsString()
    house_number: string;

    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => City)
    city: City;
}
