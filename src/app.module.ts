import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseEnvironmentConfig } from './configs/environment-config';
import { validationSchema } from './configs/config-validation';
import {MembershipModule} from "./membership/memebership.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot(databaseEnvironmentConfig),
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    EventEmitterModule.forRoot(),
    MembershipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
