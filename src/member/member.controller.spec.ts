import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

describe('MemberController', () => {
    let controller: MemberController;
    let mock_service = {

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MemberController],
            providers: [MemberService],
        })
            .overrideProvider(MemberService).useValue(mock_service)
            .compile();

        controller = module.get<MemberController>(MemberController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
