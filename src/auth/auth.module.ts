import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { logger } from 'src/middleware/logger.middleware';
@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>("JWT_SECRET"),
                    signOptions: { expiresIn: '60d' }
                }
            }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})

export class AuthModule implements NestModule {
    constructor(private configService: ConfigService) { }

    //Middleware config
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(logger)
            .exclude('')
            .forRoutes(AuthController)
        // .forRoutes({ path: '*', method: RequestMethod.ALL })
        //consumer.apply(LoggerMiddleware).forRoutes('auth/me')
    }
}

