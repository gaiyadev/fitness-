import { Module } from '@nestjs/common';
import { MembershipService } from './memebership.service';
import { membersProvider } from '../providers/repository/repository.provider';
import { Membership } from './entities/memebership.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { MembershipController } from './memebership.controller';
import { MembershipCron } from './cron-job/membership.cron';
import { ScheduleModule } from '@nestjs/schedule';
import { MembershipRememberListener } from '../listeners/membership-remember.listener';
import { EmailHelperProvider } from '../providers/email/email-helper.provider';
import { EmailTemplateProvider } from '../providers/email/email-template.provider';
import {MailTrapDevProvider} from "../providers/email/mail-trap-dev.provider";

@Module({
  imports: [SequelizeModule.forFeature([Membership]), ScheduleModule.forRoot()],
  controllers: [MembershipController],
  providers: [
    MembershipService,
    ...membersProvider,
    MembershipCron,
    MembershipRememberListener,
    EmailHelperProvider,
    EmailTemplateProvider,
    MailTrapDevProvider,
  ],
})
export class MembershipModule {}
