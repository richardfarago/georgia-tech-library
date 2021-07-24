import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

import { v4 as uuidv4 } from 'uuid';
import { UserWithRoleDTO } from './dto/with-role.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    create(createUserDto: CreateUserDto) {
        //TODO Hash password before inserting
        //user.password = createUserDto.password.hash()
        return this.userRepository.save({ id: uuidv4(), ...createUserDto });
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOneId(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    findUserWithRole(username: string): Promise<UserWithRoleDTO> {
        return this.userRepository
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
        return this.userRepository.update(id, updateUserDto);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
