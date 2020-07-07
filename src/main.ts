import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  //app.use(csurf());
  app.enableCors();
  // app.use(
  //   rateLimit({
  //     windowMs: 24 * 60 * 60 * 1000, // one day
  //     max: 100,
  //     message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  //     headers: true,
  //   }),
  // );
  await app.listen(3000);
}
bootstrap();
