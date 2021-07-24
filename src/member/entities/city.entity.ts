import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Address } from './address.entity';

@Entity('City', { schema: 'dbo' })
export class City {
  @Column('varchar', { primary: true, name: 'zip', length: 10 })
  zip: string;

  @Column('varchar', { name: 'city', length: 50 })
  city: string;
}
