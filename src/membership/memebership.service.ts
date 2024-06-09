// noinspection TypeScriptValidateTypes

import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {CreateMembershipDto} from './dto/create-memebership.dto';
import {membersRepository} from '../configs/constant';
import {Membership} from './entities/memebership.entity';
import {PaginationLink} from '../pagination/pagination-link';
import {Paginate} from '../pagination/paginate';
import {ApiResponse, createApiResponse,} from '../interfaces/responses/create-api-response';
import {UpdateMembershipDto} from './dto/update-memebership.dto';
import {Op} from 'sequelize';

@Injectable()
export class MembershipService {
  private readonly logger = new Logger('MembershipService');

  constructor(
    @Inject(membersRepository)
    private readonly memberRepository: typeof Membership,
  ) {}

  private async findMemberById(id: number): Promise<Membership> {
    const membership = await this.memberRepository.findByPk<Membership>(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'membershipType',
        'email',
        'startDate',
        'dueDate',
        'totalAmount',
        'isFirstMonth',
        'invoiceLink',
        'createdAt',
      ],
    });

    if (!membership) {
      throw new NotFoundException(`member with id ${id} not found`);
    }
    return membership;
  }

  private async checkMemberShipDuplicate(email: string): Promise<void> {
    const existingEmail = await this.memberRepository.findOne<Membership>({
      where: { email: email.toLowerCase() },
      attributes: ['email', 'id'],
    });

    if (existingEmail) {
      throw new ConflictException(`Member ${email} already exist`);
    }
  }

  async findDueMemberships(): Promise<Membership[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    return await this.memberRepository.findAll<Membership>({
      where: {
        dueDate: {
          [Op.between]: [startOfToday, endOfToday],
        },
        isFirstMonth: true,
      },
    });
  }

  async create(
    createMembershipDto: CreateMembershipDto,
  ): Promise<ApiResponse<Membership>> {
    await this.checkMemberShipDuplicate(createMembershipDto.email);

    try {
      return this.memberRepository.sequelize.transaction(
        async (transaction) => {
          const membership: Membership =
            await this.memberRepository.create<Membership>(
              createMembershipDto,
              { transaction },
            );

          return createApiResponse('Created successfully', HttpStatus.CREATED, {
            id: membership.id,
            email: membership.email,
          });
        },
      );
    } catch (err) {
      this.logger.error(err.stack);
      throw new InternalServerErrorException(err.stack);
    }
  }

  async findAll(page: number, limit: number): Promise<ApiResponse<Membership>> {
    try {
      // Calculate total items count
      const totalCount = await this.memberRepository.count();

      // Calculate total pages
      const totalPages = Math.ceil(totalCount / limit);

      const memberships = await this.memberRepository.findAll<Membership>({
        attributes: [
          'id',
          'firstName',
          'lastName',
          'membershipType',
          'email',
          'startDate',
          'dueDate',
          'totalAmount',
          'isFirstMonth',
          'invoiceLink',
          'createdAt',
        ],
        limit,
        offset: (page - 1) * limit,
        order: [['id', 'DESC']],
      });

      // Construct pagination metadata and links
      const paginationMetaData = {
        totalItems: totalCount,
        itemCount: memberships.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      };

      const paginationLinks = new PaginationLink(page, totalPages, limit);

      // Construct the paginated result
      const paginate: Paginate<Membership> = {
        items: memberships,
        meta: paginationMetaData,
        links: paginationLinks,
      };

      return createApiResponse('Fetched successfully', HttpStatus.OK, paginate);
    } catch (err) {
      this.logger.error(err.stack);
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async findOne(id: number): Promise<ApiResponse<Membership>> {
    try {
      const membership = await this.findMemberById(id);

      return createApiResponse(
        'Fetched successfully',
        HttpStatus.OK,
        membership,
      );
    } catch (err) {
      this.logger.error(err.stack);
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async update(
    id: number,
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<ApiResponse<Membership>> {
    try {
      const membership = await this.findMemberById(id);
      await this.checkMemberShipDuplicate(updateMembershipDto.email);
      await membership.update(updateMembershipDto);
      return createApiResponse('Updated successfully', HttpStatus.OK, {
        id: membership.id,
      });
    } catch (e) {
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async remove(id: number): Promise<ApiResponse<Membership>> {
    const membership = await this.findMemberById(id);
    try {
      await membership.destroy();

      return createApiResponse('Removed successfully', HttpStatus.OK, null);
    } catch (err) {
      this.logger.error(err.stack);
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
