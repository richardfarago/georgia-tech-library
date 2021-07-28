import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserDto } from 'src/user/dto/jwt-user.dto';
import { UserRoleDto } from 'src/user/dto/user-role.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(private user_service: UserService, private jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<JwtUserDto> {
        const user: UserRoleDto = await this.user_service.findUserWithRole(username);

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: JwtUserDto): { access_token: string } {
        return { access_token: this.jwtService.sign(user) };
    }

    changePassword(id: string, password: string): Promise<UpdateResult> {
        return this.user_service.update(id, { password })
    }
}
