import { Test, TestingModule } from '@nestjs/testing';
import { IsString, isUUID } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  const mockService = {
    create: jest.fn((dto) => {
      return { id: 'ff2e61fc-4cf4-4954-a2f2-fd3760e2b5fd', ...dto };
    }),
    update: jest.fn((id, dto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto: CreateUserDto = {
      username: 'test',
      password: 'password',
    };

    expect(controller.create(createUserDto)).toEqual({
      id: expect.any(String),
      username: createUserDto.username,
      password: createUserDto.password,
    });

    expect(mockService.create).toBeCalled();
    expect(mockService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should update a user', () => {
    const updateUserDto: UpdateUserDto = {
      password: 'password1',
    };

    expect(
      controller.update('ff2e61fc-4cf4-4954-a2f2-fd3760e2b5fd', updateUserDto),
    ).toEqual({
      id: expect.any(String),
      password: updateUserDto.password,
    });

    expect(mockService.update).toHaveBeenCalled();
  });
});
