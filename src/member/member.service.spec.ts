import { Test, TestingModule } from '@nestjs/testing';
import { find } from 'rxjs';
import { MemberService } from './member.service';

describe('MemberService', () => {
    let service: MemberService;
    let mock_member_repository = {
        save: jest.fn(() => { }),
        find: jest.fn(() => { }),
        findOne: jest.fn(() => { }),
        update: jest.fn(() => { }),
        delete: jest.fn(() => { })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MemberService],
        }).compile();

        service = module.get<MemberService>(MemberService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
