import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService],
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
