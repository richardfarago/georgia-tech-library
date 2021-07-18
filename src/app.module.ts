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


const validationOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: false,
  stopAtFirstError: true,
  transform: true, //--> Transform request object into the desired entity type + conversion of primitive types
  //skipMissingProperties: true //--> Only validate present properties
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DOCKER,
      port: parseInt(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
      ssl: true,
      namingStrategy: new SnakeNamingStrategy(),
      extra: {
        trustServerCertificate: true,
        Encrypt: true,
        IntegratedSecurity: false,
      }
    }),
    UserModule,
    AuthModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_PIPE, useValue: new ValidationPipe(validationOptions) } // { provide: APP_PIPE, useFactory: () => new ValidationPipe(validationOptions) }
  ],
})

export class AppModule {
  constructor() {
    console.log(process.env.HOST)
  }
}
