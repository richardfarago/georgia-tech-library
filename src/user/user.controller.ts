import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainUserDto } from './dto/plain-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<PlainUserDto> {
        return this.userService.create(createUserDto);
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
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.userService.remove(id);
    }
}
