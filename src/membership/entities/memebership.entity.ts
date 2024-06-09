import {
  AutoIncrement,
  BeforeSave,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

// noinspection JSAnnotator
@Table({ tableName: 'members' })
export class Membership extends Model<Membership> {
  @AutoIncrement
  @PrimaryKey
  @Column({ field: 'membership_id', type: DataType.INTEGER })
  id: number;

  @Column({ field: 'first_name', type: DataType.STRING })
  firstName: string;

  @Column({ field: 'last_name', type: DataType.STRING })
  lastName: string;

  @Column({ field: 'membership_type', type: DataType.STRING })
  membershipType: string;

  @IsEmail
  @Unique
  @Column({ field: 'email', type: DataType.STRING })
  email: string;

  @Column({ field: 'start_date', type: DataType.DATE })
  startDate: Date;

  @Column({ field: 'due_date', type: DataType.DATE })
  dueDate: Date;

  @Column({ field: 'total_amount', type: DataType.DECIMAL })
  totalAmount: number;

  @Column({ field: 'is_first_month', type: DataType.BOOLEAN })
  isFirstMonth: boolean;

  @Column({ field: 'invoice_link', type: DataType.STRING })
  invoiceLink: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at', type: DataType.DATE })
  deletedAt: Date;

  @BeforeSave
  static async convertEmailToLowercase(instance: Membership) {
    instance.email = instance.email.toLowerCase();
  }
}
