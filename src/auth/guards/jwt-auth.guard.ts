import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PERMISSION_KEY } from 'src/common/decorators/permission.decorator';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        return super.canActivate(context)

        // const canActivate = super.canActivate(context)

        // if (canActivate) {
        //     const requiredRoles = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
        //         context.getHandler(),
        //         context.getClass(),
        //     ]);

        //     const { user } = context.switchToHttp().getRequest();
        //     console.log(requiredRoles)
        //     console.log(user)
        //     return requiredRoles?.some((role) => user?.role?.includes(role));
        // }
        // return canActivate


    }
}