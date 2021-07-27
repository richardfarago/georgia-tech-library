import { Controller, Request, Post, UseGuards, Get, Put, NotImplementedException } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { RequirePermission } from 'src/common/decorators/permission.decorator';
import { Permissions } from 'src/common/constants/permissions.enum';
import { JwtUserDto } from 'src/user/dto/jwt-user.dto';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): { access_token: string } {
        const user: JwtUserDto = req.user;
        return this.authService.login(user);
    }

    @Get('me')
    @RequirePermission(Permissions.GET_ME)
    getProfile(@Request() req) {
        return req.user;
    }

    @Put('password')
    changePassword(@Request() req) {
        throw new NotImplementedException();
    }
}
