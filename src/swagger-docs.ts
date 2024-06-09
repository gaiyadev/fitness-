import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerDocs = (app: any) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Fitness aPI')
    .setDescription('The Fitness API description')
    .setVersion('1.0')
    .addTag('Fitness')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
