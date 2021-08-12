import { SetMetadata } from '@nestjs/common';

//Decorator that accepts permissions (for authorization)

export const PERMISSION_KEY = 'permission';
export const RequirePermission = (permissions: string[]) => SetMetadata(PERMISSION_KEY, permissions);
