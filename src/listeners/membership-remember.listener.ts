import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailHelperProvider } from '../providers/email/email-helper.provider';
import { EmailTemplateProvider } from '../providers/email/email-template.provider';
import { membershipReminder } from '../configs/constant';
import { MembershipRememberEvent } from '../events/membership-remember.event';

@Injectable()
export class MembershipRememberListener {
  constructor(
    private readonly emailHelperService: EmailHelperProvider,

    private readonly emailTemplateService: EmailTemplateProvider,
  ) {}

  @OnEvent(membershipReminder)
  async handleReminderCreatedEvent(
    payload: MembershipRememberEvent,
  ): Promise<void> {
    const { templateData, email } = payload;

    const htmlContent = await this.emailTemplateService.renderTemplate(
      'src/templates/emails/ membership-reminder.hbs',
      templateData,
    );

    this.emailHelperService.sendEmailNotification(
      email,
      `reminder ${templateData.firstName}`,
      htmlContent,
    );
  }
}
