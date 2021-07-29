import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToClass } from 'class-transformer';

import { v4 as uuidv4 } from 'uuid';
import { PlainUserDto } from './dto/plain-user.dto';
import { UserRoleDto } from './dto/user-role.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private user_repository: Repository<User>) {}

    create(create_user_dto: CreateUserDto): Promise<PlainUserDto> {
        //TODO Hash password before inserting
        //user.password = create_user_dto.password.hash()

        return this.user_repository.save({ id: uuidv4(), ...create_user_dto }).then((newUser) => {
            const { password, ...result } = newUser;
            return plainToClass(PlainUserDto, result);
        });
    }

    findAll(): Promise<PlainUserDto[]> {
        return this.user_repository.find();
    }

    findOneId(id: string): Promise<PlainUserDto> {
        return this.user_repository.findOne(id);
    }

    findUserWithRole(username: string): Promise<UserRoleDto> {
        return this.user_repository
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

    update(id: string, update_user_dto: UpdateUserDto) {
        return this.user_repository.update(id, update_user_dto);
    }

    remove(id: string): Promise<DeleteResult> {
        return this.user_repository.delete(id);
    }
}
