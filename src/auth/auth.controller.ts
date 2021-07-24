import {
    Controller,
    Request,
    Post,
    UseGuards,
    Get,
    Put,
    NotImplementedException,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RBAC } from 'src/common/constants/roles.enum';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        const user: User = req.user;
        return this.authService.login(user);
    }

    @Get('me')
    @Roles(RBAC.getMe)
    getProfile(@Request() req) {
        return req.user;
    }

    @Put('password')
    changePassword(@Request() req) {
        throw new NotImplementedException();
    }
}
