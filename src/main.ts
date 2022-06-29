import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptors } from './common/interceptors/timeout.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptors());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000, () => {
    console.log('SERVIDOR RODANDO');
  });
}
bootstrap();
