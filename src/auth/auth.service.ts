import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserWithRoleDTO } from 'src/user/dto/with-role.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string) {
        const user: UserWithRoleDTO = await this.userService.findUserWithRole(username);
        if (user && user.password === pass) {

            //TODO figure out DTOs
            // const { password, ...result } = user;
            // return result;

            return user;
        }
        return null;
    }

    async login(user: any) {
        const payLoad = {
            username: user.username,
            userId: user.id,
            role: user.role,
        };
        return { access_token: this.jwtService.sign(payLoad) };
    }
}
