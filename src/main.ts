import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up Swagger
  const options = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('API documentation for the library management system')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document); // 'api' is the endpoint to access Swagger UI

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();