import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Address } from 'src/member/entities/address.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('Employee', { schema: 'dbo' })
export class Employee {
    @Column('varchar', { primary: true, name: 'user_id', length: 50 })
    user_id: string;

    @Column('varchar', { name: 'role', length: 50 })
    @ManyToOne(() => Address)
    @JoinColumn([{ name: 'home_address_id', referencedColumnName: 'id' }])
    home_address: Address;

    @OneToOne(() => User, (user) => user.employee)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}
