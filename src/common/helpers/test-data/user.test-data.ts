import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { PlainUserDto } from '../../../user/dto/plain-user.dto';
import { UpdateUserDto } from '../../../user/dto/update-user.dto';
import { User } from '../../../user/entities/user.entity';

export const create_user_dto: CreateUserDto = {
    username: 'test',
    password: 'password',
};

export const update_user_dto: UpdateUserDto = {
    username: 'test123',
    password: 'password123',
};

export const user_single: PlainUserDto = {
    id: '00005591-6afb-4c47-b010-e64350bffbd8',
    username: 'nilchenko4r',
}

export const user_list: PlainUserDto[] = [
    {
        id: '00005591-6afb-4c47-b010-e64350bffbd8',
        username: 'nilchenko4r',
    },
    {
        id: '0003950f-d088-47d7-8e10-7384d503fd30',
        username: 'gbardema',
    },
    {
        id: '0006ed9f-50fa-491e-88d7-03d646ea6ace',
        username: 'charbincc',
    },
];
