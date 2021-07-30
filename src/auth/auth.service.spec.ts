import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtUserDto } from '../user/dto/jwt-user.dto';
import { UserRoleDto } from '../user/dto/user-role.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let jwt: JwtService;

    const user: UserRoleDto = { id: 'uuid', username: 'test', password: 'password', role: 'test_user' };
    const jwt_user: JwtUserDto = { id: 'uuid', username: 'test', role: 'test_user' };

    const mock_user_service = {
        findUserWithRole: jest.fn((username, password) => user),
        update: jest.fn((id, password) => Promise.resolve(true)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.registerAsync({
                    useFactory: async () => {
                        return {
                            secret: '123',
                            signOptions: { expiresIn: '60d' },
                        };
                    },
                }),
            ],
            providers: [AuthService, UserService],
        })
            .overrideProvider(UserService)
            .useValue(mock_user_service)
            .compile();

        service = module.get<AuthService>(AuthService);
        jwt = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('validate user', () => {
        it('should return true with correct password', async () => {
            jest.spyOn(mock_user_service, 'findUserWithRole');
            expect(await service.validateUser(user.username, user.password)).toEqual(jwt_user);
            expect(mock_user_service.findUserWithRole).toBeCalledWith(user.username);
        });

        it('should return null with incorrect password', async () => {
            jest.spyOn(mock_user_service, 'findUserWithRole');
            expect(await service.validateUser(user.username, 'wrong_password')).toBeNull();
            expect(mock_user_service.findUserWithRole).toBeCalledWith(user.username);
        });
    });

    describe('login', () => {
        it('should return jwt token', () => {
            const { access_token } = service.login(user);
            const { username, id, role } = (jwt as any).decode(access_token);

            expect(access_token).toBeTruthy();
            expect(username).toEqual(user.username);
            expect(id).toEqual(user.id);
            expect(role).toEqual(user.role);
        });
    });

    describe('change password', () => {
        it('should change password', async () => {
            jest.spyOn(mock_user_service, 'update');
            expect(await service.changePassword(user.id, user.password)).toBe(true);
            expect(mock_user_service.update).toBeCalledWith(user.id, { password: user.password });
        });
    });
});
