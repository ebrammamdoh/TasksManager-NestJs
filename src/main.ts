import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  //app.use(csurf());
  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }
  else {
    app.enableCors({ origin: 'www.example.com'});
  }
  
  // app.use(
  //   rateLimit({
  //     windowMs: 24 * 60 * 60 * 1000, // one day
  //     max: 100,
  //     message: 'You have exceeded the 100 requests in 24 hrs limit!', 
  //     headers: true,
  //   }),
  // );

  const serverConfig = config.get('server');

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`application listining to port ${port}`)
}
bootstrap();
