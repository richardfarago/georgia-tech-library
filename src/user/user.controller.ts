import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainUserDto } from './dto/plain-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() create_user_dto: CreateUserDto): Promise<PlainUserDto> {
        return this.userService.create(create_user_dto);
    }

    @Get()
    findAll(): Promise<PlainUserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOneId(@Param('id', ParseUUIDPipe) id: string): Promise<PlainUserDto> {
        return this.userService.findOneId(id);
    }

    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() update_user_dto: UpdateUserDto): Promise<UpdateResult> {
        return this.userService.update(id, update_user_dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.userService.remove(id);
    }
}
