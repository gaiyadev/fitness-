import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IMailOptions } from '../../interfaces/mail/mail-options.interface';
import { emailFromAddress, emailFromName } from '../../configs/constant';
import { MailTrapDevProvider } from './mail-trap-dev.provider';

@Injectable()
export class EmailHelperProvider {
  constructor(private readonly mailTrapDevService: MailTrapDevProvider) {}

  async sendEmailNotification(
    email: string,
    subject: string,
    html: any,
  ): Promise<unknown> {
    try {
      const mailOptions: IMailOptions = {
        from: `${emailFromName} <${emailFromAddress}>`,
        to: email,
        subject: subject,
        html: html,
      };

      return await this.mailTrapDevService.sendEmail(mailOptions);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
