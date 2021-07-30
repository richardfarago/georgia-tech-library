import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSubscriber } from './user.subscriber';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Member } from '../member/entities/member.entity';
import { Employee } from '../employee/entities/employee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Employee, Member])],
    controllers: [UserController],
    providers: [UserService, UserSubscriber],
    exports: [UserService],

    //Export TypeOrmModule if UserRepo needs to be used outside this module
})
export class UserModule {
    //implements NestModule
    //Middleware config
    // configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(logger)
    //     .forRoutes(UserController)
    // }
}
