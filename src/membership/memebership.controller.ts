import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MembershipService } from './memebership.service';
import { UpdateMembershipDto } from './dto/update-memebership.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../interfaces/responses/create-api-response';
import { Membership } from './entities/memebership.entity';
import { CreateMembershipDto } from './dto/create-memebership.dto';

@ApiTags('memberships')
@Controller({ version: '1', path: 'memberships' })
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<ApiResponse<Membership>> {
    return await this.membershipService.create(createMembershipDto);
  }

  @Get('/')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<ApiResponse<Membership>> {
    limit = limit > 100 ? 100 : limit;
    return await this.membershipService.findAll(page, limit);
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Membership>> {
    return await this.membershipService.findOne(id);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ): Promise<ApiResponse<Membership>> {
    return await this.membershipService.update(id, updateMembershipDto);
  }

  @Delete('/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<Membership>> {
    return await this.membershipService.remove(id);
  }
}
