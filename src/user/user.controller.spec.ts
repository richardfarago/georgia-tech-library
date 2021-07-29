import { Test, TestingModule } from '@nestjs/testing';
import { create_user_dto, update_user_dto, user_list } from '../../src/common/helpers/test-data/user.test-data';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mock_service = {
        create: jest.fn((dto: CreateUserDto) => Promise.resolve(dto)),
        findAll: jest.fn(() => Promise.resolve(user_list)),
        findOneId: jest.fn((id) => Promise.resolve(user_list.filter((x) => x.id === id)[0])),
        update: jest.fn((id, dto) => Promise.resolve(true)),
        remove: jest.fn((id) => Promise.resolve(true)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        })
            .overrideProvider(UserService)
            .useValue(mock_service)
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

            expect(await controller.create(create_user_dto)).toBeTruthy();
            expect(service.create).toBeCalledWith(create_user_dto);
        });
    });

    describe('get all users', () => {
        it('should return all users', async () => {
            jest.spyOn(service, 'findAll');

            expect(await controller.findAll()).toEqual(user_list);
            expect(service.findAll).toBeCalledWith();
        });
    });

    describe('get user', () => {
        it('should return a user', async () => {
            jest.spyOn(service, 'findOneId');

            expect(await controller.findOneId(user_list[0].id)).toEqual(user_list[0]);
            expect(service.findOneId).toBeCalled();
        });
    });

    describe('update user', () => {
        it('should updpate a user', async () => {
            jest.spyOn(service, 'update');

            expect(await controller.update(user_list[0].id, update_user_dto)).toBeTruthy();
            expect(service.update).toBeCalledWith(user_list[0].id, update_user_dto);
        });
    });

    describe('remove users', () => {
        it('should remove a user', async () => {
            jest.spyOn(service, 'remove');

            expect(await controller.remove(user_list[0].id)).toBeTruthy();
            expect(service.remove).toBeCalledWith(user_list[0].id);
        });
    });
});
