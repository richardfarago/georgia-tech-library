import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { PlainUserDto } from './dto/plain-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;


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
            id: "00005591-6afb-4c47-b010-e64350bffbd8",
            username: "nilchenko4r"
        },
        {
            id: "0003950f-d088-47d7-8e10-7384d503fd30",
            username: "gbardema"
        },
        {
            id: "0006ed9f-50fa-491e-88d7-03d646ea6ace",
            username: "charbincc"
        }
    ]

    const mock_service = {
        create: jest.fn((dto: CreateUserDto) => Promise.resolve(dto)),
        findAll: jest.fn(() => Promise.resolve(user_array)),
        findOneId: jest.fn((id) => Promise.resolve(user_array.filter(x => x.id === id)[0])),
        update: jest.fn((id, dto) => Promise.resolve(true)),
        remove: jest.fn(id => Promise.resolve(true))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService).useValue(mock_service)
            .compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create user', () => {
        it('should create a user', async () => {
            jest.spyOn(service, 'create');

            expect(await controller.create(create_user_dto)).toBeTruthy()
            expect(service.create).toBeCalledWith(create_user_dto);
        });
    })

    describe('get all users', () => {
        it('should return all users', async () => {
            jest.spyOn(service, 'findAll');

            expect(await controller.findAll()).toEqual(user_array)
            expect(service.findAll).toBeCalledWith();
        });
    })

    describe('get user', () => {
        it('should return a user', async () => {
            jest.spyOn(service, 'findOneId');

            expect(await controller.findOneId(user_array[0].id)).toEqual(user_array[0])
            expect(service.findOneId).toBeCalled();
        });
    })

    describe('update user', () => {
        it('should updpate a user', async () => {
            jest.spyOn(service, 'update');

            expect(await controller.update(user_array[0].id, update_user_dto)).toBeTruthy()
            expect(service.update).toBeCalledWith(user_array[0].id, update_user_dto);
        });
    })

    describe('remove users', () => {
        it('should remove a user', async () => {
            jest.spyOn(service, 'remove');

            expect(await controller.remove(user_array[0].id)).toBeTruthy()
            expect(service.remove).toBeCalledWith(user_array[0].id);
        });
    })
});
