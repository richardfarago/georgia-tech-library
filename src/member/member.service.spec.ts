import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';
import { mock_connection } from '../common/helpers/mocks/dbConnectionMock';
import { create_student, create_lib, member_list, member_single, update_member, member_id } from '../common/helpers/test-data/member.test-data';

describe('MemberService', () => {
    let service: MemberService;

    const mock_member_repository = {
        create: jest.fn((dto) => dto),
        save: jest.fn((dto) => Promise.resolve(dto)),
        find: jest.fn(() => Promise.resolve(member_list)),
        findOne: jest.fn(() => Promise.resolve(member_single)),
        update: jest.fn(() => Promise.resolve(true)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MemberService,
                {
                    provide: getRepositoryToken(Member),
                    useValue: mock_member_repository,
                },
                {
                    provide: getConnectionToken(),
                    useValue: mock_connection,
                },
            ],
        }).compile();

        service = module.get<MemberService>(MemberService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(mock_connection.transaction((manager) => manager.query())).toBeTruthy();
    });

    describe('create a member', () => {
        it('should create a student', async () => {
            jest.spyOn(mock_member_repository, 'save');

            const created = await service.create(create_student);

            expect(created.user.id).toBeDefined();
            expect(created.member_card).toBeDefined();
            expect(created.school_member.home_address.id).toBeDefined();
            expect(created.campus_address.id).toBeDefined();
            expect(created.library).toBeNull();
            expect(mock_member_repository.save).toBeCalledWith(create_student);
        });

        it('should create a library', async () => {
            jest.spyOn(mock_member_repository, 'save');

            const created = await service.create(create_lib);

            expect(created.user.id).toBeDefined();
            expect(created.member_card).toBeDefined();
            expect(created.school_member).toBeNull();
            expect(created.campus_address.id).toBeDefined();
            expect(created.library).toBeDefined();
            expect(mock_member_repository.save).toBeCalledWith(create_lib);
        });

        it('should create member card', () => {
            const card = service.create_member_card(member_id);
            expect(card.issuedAt).toBeTruthy();
            expect(card.number).toBeTruthy();
            expect(card.photo_url).toBeTruthy();
        });
    });

    describe('find', () => {
        it('should find one', async () => {
            jest.spyOn(mock_member_repository, 'findOne');
            expect(await service.findOne(member_id)).toEqual(member_single);
            expect(mock_member_repository.findOne).toBeCalled();
        });

        it('should find all', async () => {
            jest.spyOn(mock_member_repository, 'find');
            expect(await service.findAll()).toEqual(member_list);
            expect(mock_member_repository.find).toBeCalled();
        });
    });

    describe('update', () => {
        it('should update a member', async () => {
            jest.spyOn(mock_member_repository, 'update');
            expect(await service.update(update_member.id, update_member.body)).toBeTruthy();
            expect(mock_member_repository.update).toBeCalledWith(update_member.id, update_member.body);
        });
    });

    describe('remove', () => {
        it('should remove a member', async () => {
            jest.spyOn(mock_connection, 'transaction');
            jest.spyOn(service, 'findOne'); //--> external input

            expect(await service.remove(member_id)).toBe('Member deleted');

            expect(mock_connection.transaction).toBeCalled();
            expect(service.findOne).toBeCalledWith(member_id);
        });
    });
});
