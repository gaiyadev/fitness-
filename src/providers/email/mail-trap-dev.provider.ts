import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { IMailOptions } from '../../interfaces/mail/mail-options.interface';
dotenv.config();

@Injectable()
export class MailTrapDevProvider {
  logger = new Logger('MailTrapDevProvider');

  async sendEmail(mailOptions: IMailOptions): Promise<unknown> {
    try {
      const transport = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_HOST,
        port: +process.env.MAIL_TRAP_PORT,
        auth: {
          user: process.env.MAIL_TRAP_USERNAME,
          pass: process.env.MAIL_TRAP_PASSWORD,
        },
      });
      return await transport.sendMail(mailOptions);
    } catch (err) {
      this.logger.error(`An error occurred ${err}`);
      throw new InternalServerErrorException(`An error occurred`);
    }
  }
}
