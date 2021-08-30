import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { mock_connection } from '../common/utilities/mocks/dbConnectionMock';
import { create_employee_dto, employee_list, employee_single, employee_id, update_employee } from '../common/utilities/test-data/employee.test-data';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

describe('EmployeeService', () => {
    let service: EmployeeService;

    const mock_employee_repository = {
        create: jest.fn((dto) => dto),
        save: jest.fn((dto) => dto),
        find: jest.fn(() => employee_list),
        findOne: jest.fn(() => employee_single),
        update: jest.fn((id, dto) => Promise.resolve(true)),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmployeeService,
                {
                    provide: getRepositoryToken(Employee),
                    useValue: mock_employee_repository,
                },
                {
                    provide: getConnectionToken(),
                    useValue: mock_connection,
                },
            ],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an employee', async () => {
            jest.spyOn(mock_employee_repository, 'create');
            jest.spyOn(mock_employee_repository, 'save');

            const employee: Employee = await service.create(create_employee_dto);

            expect(employee.user.id).toBeDefined();
            expect(employee.home_address.id).toBeDefined();

            expect(mock_employee_repository.create).toBeCalledWith(create_employee_dto);
            expect(mock_employee_repository.save).toBeCalled();
        });
    });

    describe('find', () => {
        it('should find all employees', async () => {
            jest.spyOn(mock_employee_repository, 'find');
            expect(await service.findAll()).toEqual(employee_list);
            expect(mock_employee_repository.find).toBeCalled();
        });

        it('should find one employees', async () => {
            jest.spyOn(mock_employee_repository, 'findOne');
            expect(await service.findOne(employee_id)).toEqual(employee_single);
            expect(mock_employee_repository.findOne).toBeCalledWith(employee_id);
        });
    });

    describe('update', () => {
        it('should update an employee', async () => {
            jest.spyOn(mock_employee_repository, 'update');
            expect(await service.update(update_employee.id, update_employee.body)).toBeTruthy();
            expect(mock_employee_repository.update).toBeCalledWith(update_employee.id, update_employee.body);
        });
    });

    describe('remove', () => {
        it('should remove an employee', async () => {
            jest.spyOn(mock_connection, 'transaction');
            jest.spyOn(service, 'findOne'); //--> external input

            expect(await service.remove(employee_id)).toEqual('Employee deleted');

            expect(mock_connection.transaction).toBeCalled();
            expect(service.findOne).toBeCalledWith(employee_id);
        });

        it('should fail while removing a employee', () => {
            const error = new Error('This is an error');
            jest.spyOn(mock_connection, 'transaction').mockImplementation((cb) => {
                return cb({
                    query: jest.fn(() => {
                        throw error;
                    }),
                });
            });
            expect(() => service.remove(employee_id)).rejects.toThrowError(InternalServerErrorException);
            expect(mock_connection.transaction).toBeCalled();
        });
    });
});
