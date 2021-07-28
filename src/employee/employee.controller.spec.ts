import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
    let controller: EmployeeController;

    const mock_employee_service = {

    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EmployeeController],
            providers: [EmployeeService],
        })
            .overrideProvider(EmployeeService).useValue(mock_employee_service)
            .compile();

        controller = module.get<EmployeeController>(EmployeeController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
