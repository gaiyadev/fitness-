export class MembershipRememberEvent {
  constructor(
    public templateData: {
      firstName: string;
      isFirstMonth: boolean;
      membershipType: string;
      dueDate: Date;
      totalAmount: number;
      monthlyAmount: number;
      invoiceLink?: string;
    },
    public email: string,
  ) {}
}
