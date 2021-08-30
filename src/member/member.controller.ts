import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateResult } from 'typeorm';
import { RequirePermission } from '../rbac/decorators/permission.decorator';
import { Permissions } from '../rbac/constants/permissions.enum';
import { DoesExistGuard } from '../common/guards/does-exist.guard';
import { Member } from './entities/member.entity';

@ApiBearerAuth()
@ApiTags('Members')
@Controller('member')
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post()
    @RequirePermission(Permissions.CREATE_MEMBER)
    create(@Body() create_member_dto: CreateMemberDto) {
        return this.memberService.create(create_member_dto);
    }

    @Get()
    @RequirePermission(Permissions.READ_MEMBER)
    findAll() {
        return this.memberService.findAll();
    }

    @Get(':id')
    @RequirePermission(Permissions.READ_MEMBER)
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.memberService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(new DoesExistGuard(Member, 'id'))
    @RequirePermission(Permissions.UPDATE_MEMBER)
    update(@Param('id', ParseUUIDPipe) id: string, @Body() update_member_dto): Promise<UpdateResult> {
        return this.memberService.update(id, update_member_dto);
    }

    @Delete(':id')
    @UseGuards(new DoesExistGuard(Member, 'id'))
    @RequirePermission(Permissions.DELETE_MEMBER)
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
        return this.memberService.remove(id);
    }
}
