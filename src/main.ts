import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  //Global guard initialization
  const reflector = new Reflector();
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //Swagger initialization
  const config = new DocumentBuilder().setTitle('Better budget API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Config initialization
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
