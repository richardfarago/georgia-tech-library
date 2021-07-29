import { Controller, Request, Post, UseGuards, Get, Put, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../../src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequirePermission } from '../../src/common/decorators/permission.decorator';
import { Permissions } from '../../src/common/constants/permissions.enum';
import { JwtUserDto } from '../../src/user/dto/jwt-user.dto';
import { UpdateResult } from 'typeorm';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private auth_service: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): { access_token: string } {
        const user: JwtUserDto = req.user;
        return this.auth_service.login(user);
    }

    @Get('me')
    @RequirePermission(Permissions.GET_ME)
    getProfile(@Request() req) {
        return req.user;
    }

    @Put('password')
    changePassword(@Request() req, @Body('password') password: string): Promise<UpdateResult> {
        return this.auth_service.changePassword(req.user.id, password);
    }
}
