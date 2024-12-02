import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const isSSL = process.env.SSL === 'true';
  const app = await NestFactory.create(AppModule, {
    httpsOptions: isSSL
      ? {
          key: fs.readFileSync('./src/cert/key.pem'),
          cert: fs.readFileSync('./src/cert/cert.pem'),
        }
      : undefined,
  });
  const config = new DocumentBuilder()
    .setTitle('Info Sistemas')
    .setDescription('The infoSistemas API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 80);
}
bootstrap();
