import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    //TODO get role for authorisation here
    user.role = 'Admin';

    console.log(user);
    return user;
  }
}
