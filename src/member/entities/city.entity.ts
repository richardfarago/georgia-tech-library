import { IsNumberString, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('City', { schema: 'dbo' })
export class City {
    @IsNumberString()
    @Column('varchar', { primary: true, name: 'zip', length: 10 })
    zip: string;

    @IsString()
    @Column('varchar', { name: 'city', length: 50 })
    city: string;
}
