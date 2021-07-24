import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { DatabaseSubscriber } from './database.subscriber';

@Module({
    providers: [...databaseProviders, DatabaseSubscriber],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
