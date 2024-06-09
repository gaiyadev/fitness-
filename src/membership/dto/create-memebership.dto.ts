import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum MembershipType {
  annualBasic = 'Annual Basic',
  monthlyPremium = 'Monthly Premium',
}

export class CreateMembershipDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  totalAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  dueDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isFirstMonth: boolean;

  @ApiProperty()
  @IsOptional()
  invoiceLink: string;

  @ApiProperty()
  @IsEnum(MembershipType, {
    message: `Value must be ${MembershipType.monthlyPremium} or ${MembershipType.annualBasic}`,
  })
  membershipType: MembershipType;
}
