import { SetMetadata } from '@nestjs/common';

//Decorator that accepts roles (authorisation)

export const ROLES_KEY = 'roles'
export const Roles = (roles: string[]) => SetMetadata(ROLES_KEY, roles);