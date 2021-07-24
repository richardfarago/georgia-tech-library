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

    @ManyToOne(() => City, { eager: true })
    @JoinColumn({ name: 'zip', referencedColumnName: 'zip' })
    city: City;
}
