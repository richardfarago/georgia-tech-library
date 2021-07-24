import { Test, TestingModule } from '@nestjs/testing';
import { IsString, isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        create: jest.fn((dto) => {
                            return { id: 'this is a uuid', ...dto };
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a user with spy', () => {
        const createUserDto: CreateUserDto = {
            username: 'test',
            password: 'password',
        };

        jest.spyOn(service, 'create');

        expect(controller.create(createUserDto)).toEqual({
            id: expect.any(String),
            username: createUserDto.username,
            password: createUserDto.password,
        });

        expect(service.create).toBeCalledWith(createUserDto);
    });

    it('should find a user with spy', () => {
        const createUserDto: CreateUserDto = {
            username: 'test',
            password: 'password',
        };

        jest.spyOn(service, 'create');

        expect(controller.create(createUserDto)).toEqual({
            id: expect.any(String),
            username: createUserDto.username,
            password: createUserDto.password,
        });

        expect(service.create).toBeCalledWith(createUserDto);
    });
});
