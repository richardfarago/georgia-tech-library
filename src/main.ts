import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
const apiMetrics = require('prometheus-api-metrics');

declare const module: any;
const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    //Swagger init
    const config = new DocumentBuilder()
        .setTitle('Georgia Tech Library')
        .setDescription('Software Development PBA 1st Semester')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, swaggerOptions);

    //Logger middleware innit
    app.use(logger);
    app.use(apiMetrics());

    //Hot-reload init
    // if (module.hot) {
    //   module.hot.accept();
    //   module.hot.dispose(() => app.close());
    // }

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
