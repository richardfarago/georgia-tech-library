import { Injectable, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator'
import { ROLES_KEY } from 'src/common/decorators/roles.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext) {

        //Getting is_public metadata
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])
        if (isPublic) {
            return true
        }

        /* RBAC */

        // const request = context.switchToHttp().getRequest();
        // const user = request.user;

        // //Getting roles metadata
        // const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
        // if (!roles) {
        //     return true;
        // }

        // //Evaluating roles
        // if (roles.includes(user.role)) {
        //     return true
        // }

        //return false //--> 403 Forbidden

        return super.canActivate(context)
    }
}