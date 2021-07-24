import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserWithRoleDTO } from 'src/user/dto/with-role.dto';
import { ALL_ROLES, Roles } from 'src/common/constants/roles.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<UserWithRoleDTO> {

        //TODO Hash password before checking
        // password = password.hash()

        const user: UserWithRoleDTO = await this.authService.validateUser(username, password);
        if (ALL_ROLES.filter(x => x === user.role).length === 0) {
            user.role = Roles.LIB
        }

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
