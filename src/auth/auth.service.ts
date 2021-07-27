import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserDto } from 'src/user/dto/jwt-user.dto';
import { UserRoleDto } from 'src/user/dto/user-role.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<JwtUserDto> {
        const user: UserRoleDto = await this.userService.findUserWithRole(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: JwtUserDto): { access_token: string } {
        return { access_token: this.jwtService.sign(user) };
    }
}
