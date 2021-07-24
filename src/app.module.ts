import { Module, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
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
import { RolesGuard } from './auth/guards/permission.guard';
import { DatabaseModule } from './database/database.module';

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
        UserModule,
        AuthModule,
        MemberModule,
        EmployeeModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        { provide: APP_PIPE, useValue: new ValidationPipe(validationOptions) }, // { provide: APP_PIPE, useFactory: () => new ValidationPipe(validationOptions) }
    ],
})
export class AppModule { }

