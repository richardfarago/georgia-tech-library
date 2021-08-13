import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { RequirePermission } from '../rbac/decorators/permission.decorator';
import { Permissions } from '../rbac/constants/permissions.enum';
import { DoesExistGuard } from '../common/validation/guards/does-exist.guard';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    @RequirePermission(Permissions.CREATE_EMPLOYEE)
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.create(createEmployeeDto);
    }

    @Get()
    @RequirePermission(Permissions.READ_EMPLOYEE)
    findAll() {
        return this.employeeService.findAll();
    }

    @Get(':id')
    @RequirePermission(Permissions.READ_EMPLOYEE)
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.employeeService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(new DoesExistGuard(Employee, 'id'))
    @RequirePermission(Permissions.UPDATE_EMPLOYEE)
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.employeeService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    @UseGuards(new DoesExistGuard(Employee, 'id'))
    @RequirePermission(Permissions.DELETE_EMPLOYEE)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.employeeService.remove(id);
    }
}
