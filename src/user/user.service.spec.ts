import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createQueryBuilder } from '../common/helpers/mocks/createQueryBuilderMock';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PlainUserDto } from './dto/plain-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
    let service: UserService;
    let repo: Repository<User>;

    const create_user_dto: CreateUserDto = {
        username: 'test',
        password: 'password',
    };

    const update_user_dto: UpdateUserDto = {
        username: 'test123',
        password: 'password123',
    };

    const user_array: PlainUserDto[] = [
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

    const mock_user_repository = {
        createQueryBuilder: jest.fn(() => createQueryBuilder),
        save: jest.fn((dto: CreateUserDto) => Promise.resolve(dto)),
        find: jest.fn(() => Promise.resolve(user_array)),
        findOne: jest.fn((id) => Promise.resolve(user_array.filter((x) => x.id === id)[0])),
        update: jest.fn((id, dto) => Promise.resolve(true)),
        delete: jest.fn((id) => Promise.resolve(true)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mock_user_repository,
                },
            ],
        }).compile();

        repo = module.get<Repository<User>>(getRepositoryToken(User));
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create user', () => {
        it('should add UUID', async () => {
            jest.spyOn(repo, 'save');
            const result = await service.create(create_user_dto);

            expect(repo.save).toBeCalledWith({
                id: result.id,
                ...create_user_dto,
            });
        });

        it('should not return password', async () => {
            jest.spyOn(repo, 'save');
            expect(await service.create(create_user_dto)).toEqual({
                id: expect.any(String),
                username: create_user_dto.username,
            });
        });
    });

    describe('get all users', () => {
        it('should return array', async () => {
            jest.spyOn(repo, 'find');
            expect(await service.findAll()).toEqual(user_array);
        });
    });

    describe('get one user', () => {
        it('should return a user', async () => {
            jest.spyOn(repo, 'findOne');
            expect(await service.findOneId(user_array[0].id)).toEqual(user_array[0]);
        });

        it('should return a user with role', async () => {
            jest.spyOn(repo, 'createQueryBuilder');
            expect(await service.findUserWithRole('id')).toEqual(true);
        });
    });

    describe('update user', () => {
        it('should update a user', async () => {
            jest.spyOn(repo, 'update');
            expect(await service.update(user_array[0].id, update_user_dto)).toEqual(true);
        });
    });

    describe('remove user', () => {
        it('should remove a user', async () => {
            jest.spyOn(repo, 'delete');
            expect(await service.remove(user_array[0].id)).toEqual(true);
        });
    });
});
