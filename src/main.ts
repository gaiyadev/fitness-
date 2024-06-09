import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { swaggerDocs } from './swagger-docs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const compression = require('compression');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('bootstrap');

  app.use(helmet());
  app.use(compression());

  app.enableVersioning({ type: VersioningType.URI });

  app.useGlobalPipes(new ValidationPipe());

  const PORT = parseInt(process.env.PORT) || 3000;

  swaggerDocs(app);

  await app.listen(PORT, () => {
    logger.log(
      `${process.env.APP_NAME} Rest API listening on port ${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
}
bootstrap();
