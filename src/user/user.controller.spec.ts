import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { PlainUserDto } from './dto/plain-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;


    const createUserDto: CreateUserDto = {
        username: 'test',
        password: 'password',
    };

    const updateUserDto: UpdateUserDto = {
        username: 'test123',
        password: 'password123',
    };

    const userArray: PlainUserDto[] = [
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

    const mockService = {
        create: jest.fn((dto: CreateUserDto) => Promise.resolve(dto)),
        findAll: jest.fn(() => Promise.resolve(userArray)),
        findOneId: jest.fn((id) => Promise.resolve(userArray.filter(x => x.id === id)[0])),
        update: jest.fn((id, dto) => Promise.resolve(true)),
        remove: jest.fn(id => Promise.resolve(true))
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService).useValue(mockService)
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

            expect(await controller.create(createUserDto)).toBeTruthy()
            expect(service.create).toBeCalledWith(createUserDto);
        });
    })

    describe('get all users', () => {
        it('should return all users', async () => {
            jest.spyOn(service, 'findAll');

            expect(await controller.create(createUserDto)).toBeTruthy()
            expect(service.create).toBeCalledWith(createUserDto);
        });
    })

    describe('get user', () => {
        it('should return a user', async () => {
            jest.spyOn(service, 'findAll');

            expect(await controller.findAll()).toBeTruthy()
            expect(service.findAll).toBeCalled();
        });
    })

    describe('update user', () => {
        it('should updpate a user', async () => {
            jest.spyOn(service, 'update');

            expect(await controller.update(userArray[0].id, updateUserDto)).toBeTruthy()
            expect(service.update).toBeCalledWith(userArray[0].id, updateUserDto);
        });
    })

    describe('remove users', () => {
        it('should remove a user', async () => {
            jest.spyOn(service, 'remove');

            expect(await controller.remove(userArray[0].id)).toBeTruthy()
            expect(service.remove).toBeCalledWith(userArray[0].id);
        });
    })
});
