import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('Members')
@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) { }

    @Post()
    create(@Body() create_member_dto: CreateMemberDto) {
        return this.memberService.create(create_member_dto);
    }

    @Get()
    findAll() {
        return this.memberService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.memberService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() update_member_dto): Promise<UpdateResult> {
        return this.memberService.update(id, update_member_dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<any> {
        return this.memberService.remove(id);
    }
}
