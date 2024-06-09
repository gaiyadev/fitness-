import { Injectable } from '@nestjs/common';
import { MembershipService } from '../memebership.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { membershipReminder } from '../../configs/constant';
import { MembershipRememberEvent } from '../../events/membership-remember.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class MembershipCron {
  constructor(
    private readonly membershipService: MembershipService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCron() {
    const dueMemberships = await this.membershipService.findDueMemberships();
    for (const membership of dueMemberships) {
      const templateData = {
        firstName: membership.firstName,
        isFirstMonth: membership.isFirstMonth,
        membershipType: membership.membershipType,
        dueDate: membership.dueDate,
        totalAmount: membership.totalAmount,
        monthlyAmount: membership.totalAmount,
        invoiceLink: membership.invoiceLink,
      };
      //
      this.eventEmitter.emit(
        membershipReminder,
        new MembershipRememberEvent(templateData, membership.email),
      );
    }
  }
}
