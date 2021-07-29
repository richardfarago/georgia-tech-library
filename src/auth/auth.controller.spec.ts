import { Test, TestingModule } from '@nestjs/testing';
import { JwtUserDto } from '../../src/user/dto/jwt-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;

    const jwt_user: JwtUserDto = { id: 'uuid', username: 'test', role: 'test_user' };
    const token_object = { access_token: 'access_token' };

    const mock_service = {
        login: jest.fn(() => token_object),
    };

    const mock_request = { jwt_user };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        })
            .overrideProvider(AuthService)
            .useValue(mock_service)
            .compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return token', () => {
            jest.spyOn(mock_service, 'login');
            expect(controller.login(mock_request)).toEqual(token_object);
            expect(mock_service.login).toBeCalled();
        });
    });
});
