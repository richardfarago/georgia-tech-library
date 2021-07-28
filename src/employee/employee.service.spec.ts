import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

describe('EmployeeService', () => {
    let service: EmployeeService;

    const mock_employee_repository = {

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmployeeService,
                {
                    provide: getRepositoryToken(Employee),
                    useValue: mock_employee_repository
                }
            ],
        }).compile();

        service = module.get<EmployeeService>(EmployeeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
