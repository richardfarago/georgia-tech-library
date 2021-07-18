import { ConfigService } from "@nestjs/config";
import { createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const databaseProviders = [
    {
        inject: [ConfigService],
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configService: ConfigService) => await createConnection({
            type: 'mssql',
            host: configService.get<string>("AWS"),
            port: parseInt(configService.get<string>("PORT")),
            username: configService.get<string>("USERNAME"),
            password: configService.get<string>("PASSWORD"),
            database: configService.get<string>("DATABASE"),
            extra: {
                trustServerCertificate: true,
                encrypt: false,
                integratedSecurity: false,
                ssl: true,
            },
            entities: [],
            synchronize: false,
            logging: true,
            namingStrategy: new SnakeNamingStrategy(),
        })
    }
]

