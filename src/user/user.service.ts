import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserWithRoleDTO } from './dto/with-role.dto';
import { Providers } from 'src/common/constants/providers.enum';

@Injectable()
export class UserService {
    constructor(
        @Inject(Providers.DATABASE_CONNECTION) private db: Connection,
    ) { }

    create(createUserDto: CreateUserDto) {
        //TODO Hash password before inserting
        //user.password = createUserDto.password.hash()
        return this.db.getRepository(User).save({ id: uuidv4(), ...createUserDto });
    }

    findAll(): Promise<User[]> {
        return this.db.getRepository(User).find();
    }

    findOneId(id: string): Promise<User> {
        return this.db.getRepository(User).findOne(id)
    }

    findUserWithRole(username: string): Promise<UserWithRoleDTO> {
        return this.db.getRepository(User)
            .createQueryBuilder()
            .select('username')
            .addSelect('id')
            .addSelect('password_hash', 'password')
            .addSelect(`CONCAT(ISNULL(M.loan_permission,''),ISNULL(E.role,''))`, 'role')
            .leftJoin('Member', 'M', 'M.user_id = User.id')
            .leftJoin('Employee', 'E', 'E.user_id = User.id')
            .where(`User.username = '${username}'`)
            .getRawOne();
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        return this.db.getRepository(User).update(id, updateUserDto);
    }

    async remove(id: string): Promise<void> {
        await this.db.getRepository(User).delete(id);
    }
}
