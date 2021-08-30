import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';

@Injectable()
export class DoesExistGuard implements CanActivate {
    private connection: Connection;
    constructor(private repository, private key) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.connection = getConnection();
        const req = context.switchToHttp().getRequest();

        const result = await this.connection.getRepository(this.repository).findOne(req.params[this.key]);
        if (result) {
            return true;
        } else {
            throw new NotFoundException(`No entry found for the given ${this.key}.`);
        }
    }
}
