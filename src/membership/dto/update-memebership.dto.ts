import { PartialType } from '@nestjs/swagger';
import { CreateMembershipDto } from './create-memebership.dto';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {}
