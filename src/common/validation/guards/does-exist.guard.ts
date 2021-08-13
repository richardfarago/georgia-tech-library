import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';

@Injectable()
export class DoesExistGuard implements CanActivate {
    private connection: Connection
    constructor(private repository, private key) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.connection = getConnection()
        const req = context.switchToHttp().getRequest()

        let result = await this.connection.getRepository(this.repository).findOne(req.params[this.key])

        if (result) {
            console.log('Entry found')
            return true
        } else {
            console.log('Not found')
            throw new NotFoundException(`No entry found for the given ${this.key}.`)
        }
    }
}
