import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ALL_ROLES, Roles } from '../../rbac/constants/roles.enum';
import { JwtUserDto } from '../../user/dto/jwt-user.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<JwtUserDto> {
        //TODO Hash password before checking
        // password = password.hash()

        console.log('Login ' + username, password);

        const user: JwtUserDto = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (ALL_ROLES.filter((x) => x === user.role).length === 0) {
            user.role = Roles.LIB;
        }

        return user;
    }
}
