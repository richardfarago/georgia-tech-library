import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeRole } from './entities/employee-role.entity';
import { Employee } from './entities/employee.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Employee, EmployeeRole])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule { }
