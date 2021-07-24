import { createMock } from '@golevelup/nestjs-testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let jwt: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:
                [
                    JwtModule.registerAsync({
                        useFactory: async () => {
                            return {
                                secret: '123',
                                signOptions: { expiresIn: '60d' },
                            };
                        },
                    })
                ],
            providers: [AuthService, UserService],
        })
            .overrideProvider(UserService).useValue(createMock<UserService>())
            .compile();

        service = module.get<AuthService>(AuthService);
        jwt = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should log in', async () => {
        let user = {
            id: 'uuid',
            username: 'test',
            role: 'test_user'
        }

        let { access_token } = await service.login(user)
        expect(access_token).toBeTruthy()
        expect(jwt.decode(access_token)).toBeTruthy()
    })

});
