import { membersRepository } from '../../configs/constant';
import { Membership } from '../../membership/entities/memebership.entity';

export const membersProvider = [
  {
    provide: membersRepository,
    useValue: Membership,
  },
];
