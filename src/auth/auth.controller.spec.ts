import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        })
            .overrideProvider(AuthService)
            .useValue({ login: () => ['ok'], validateUser: () => ['ok'] })
            .compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // describe('findAll', () => {
    //   it('should return an array of cats', async () => {
    //     const result = ['test'];
    //     jest.spyOn(service, 'login').mockImplementation(() => result);
    //     expect(await controller.login('')).toBe(result);
    //   });
    // });
});
