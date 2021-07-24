import { ConfigService } from '@nestjs/config';
import { Providers } from 'src/common/constants/providers.enum';
import { Employee } from 'src/employee/entities/employee.entity';
import { Address } from 'src/member/entities/address.entity';
import { City } from 'src/member/entities/city.entity';
import { Library } from 'src/member/entities/library.entity';
import { LoanPermission } from 'src/member/entities/loan-permission.entity';
import { MemberCard } from 'src/member/entities/member-card.entity';
import { Member } from 'src/member/entities/member.entity';
import { SchoolMember } from 'src/member/entities/school-member.entity';
import { User } from 'src/user/entities/user.entity';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseSubscriber } from './database.subscriber';

export const databaseProviders = [
    {
        inject: [ConfigService],
        provide: Providers.DATABASE_CONNECTION,
        useFactory: async (configService: ConfigService) =>
            await createConnection({
                type: 'mssql',
                host: configService.get<string>('AWS'),
                port: parseInt(configService.get<string>('PORT')),
                username: configService.get<string>('USERNAME'),
                password: configService.get<string>('PASSWORD'),
                database: configService.get<string>('DATABASE'),
                extra: {
                    trustServerCertificate: true,
                    encrypt: false,
                    integratedSecurity: false,
                    ssl: true,
                },
                entities: [User, Member, SchoolMember, LoanPermission, MemberCard, Employee, Library, Address, City],
                subscribers: [DatabaseSubscriber],
                synchronize: false,
                logging: true,
                namingStrategy: new SnakeNamingStrategy(),
            }),
    },
];
