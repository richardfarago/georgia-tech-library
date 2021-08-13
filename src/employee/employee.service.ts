import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private employee_repository: Repository<Employee>,
        @InjectConnection() private db_connection: Connection,
    ) { }

    create(create_employee_dto: CreateEmployeeDto): Promise<Employee> {
        const employee: Employee = this.employee_repository.create(create_employee_dto);

        employee.user.id = uuid(); // --> No need to set employee.user_id
        employee.home_address.id = uuid();

        return this.employee_repository.save(employee);
    }

    findAll(): Promise<Employee[]> {
        return this.employee_repository.find();
    }

    findOne(id: string) {
        return this.employee_repository.findOne(id);
    }

    update(id: string, update_employee_dto: UpdateEmployeeDto) {
        return this.employee_repository.update(id, update_employee_dto);
    }

    remove(id: string): Promise<any> {
        return this.db_connection.transaction(async (manager) => {
            try {
                const employee: Employee = await this.findOne(id);
                await manager.query(`DELETE FROM AuthUser WHERE id = '${id}'`); // --> Employee relation cascades
                await manager.query(`DELETE FROM Address WHERE id = '${employee.home_address.id}'`);
                return 'Employee deleted';
            } catch (err) {
                throw new InternalServerErrorException(err);
            }
        });
    }
}
