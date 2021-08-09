import { ClassSerializerInterceptor, Module, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MemberModule } from './member/member.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { EmployeeModule } from './employee/employee.module';
import { PermissionGuard } from './auth/guards/permission.guard';
import { BookModule } from './book/book.module';
import { LoanModule } from './loan/loan.module';

const validationOptions: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
    stopAtFirstError: true,
    transform: true, //--> Transform request object into the desired entity type + conversion of primitive types
    //skipMissingProperties: true //--> Only validate present properties
};

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mssql',
            host: process.env.AWS,
            port: 1433,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            autoLoadEntities: true,
            synchronize: false,
            logging: false,
            ssl: true,
            keepConnectionAlive: true,
            namingStrategy: new SnakeNamingStrategy(),
            extra: {
                trustServerCertificate: true,
                encrypt: false,
                IntegratedSecurity: false,
            },
        }),
        UserModule,
        AuthModule,
        MemberModule,
        EmployeeModule,
        BookModule,
        LoanModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: PermissionGuard },
        { provide: APP_PIPE, useValue: new ValidationPipe(validationOptions) }, // { provide: APP_PIPE, useFactory: () => new ValidationPipe(validationOptions) }
    ],
})
export class AppModule { }
