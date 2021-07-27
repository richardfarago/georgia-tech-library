import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/common/decorators/permission.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const required_roles = this.reflector.getAllAndOverride<string[]>(PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (required_roles) {
            const { user } = context.switchToHttp().getRequest();
            return required_roles.some((role) => user.role?.includes(role));
        }
        return true;
    }
}
