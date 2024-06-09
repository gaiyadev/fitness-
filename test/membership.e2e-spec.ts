import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('MembershipController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // it('/memberships (POST)', async () => {
  //   const createMembershipDto: any = {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     membershipType: 'Annual Basic',
  //     email: 'john.doe@example.com',
  //     startDate: new Date('2024-01-01'),
  //     dueDate: new Date('2025-01-01'),
  //     totalAmount: 500,
  //     isFirstMonth: true,
  //     invoiceLink: 'http://example.com/invoice/1',
  //   };
  //
  //   return  request(await app.getHttpServer())
  //     .post('/api/v1/memberships')
  //     .send(createMembershipDto)
  //     .expect(201)
  // });

  it('memberships (GET)', async () => {
    return  request( await app.getHttpServer())
      .get('/memberships')
      .expect(200)
  });

  // it('memberships/:id (GET)', async () => {
  //   const membershipId = 1; // Replace with a valid membership ID
  //
  //   return  request( await app.getHttpServer())
  //     .get(`/api/v1/memberships/${membershipId}`)
  //     .expect(200)
  // });
  // it('memberships/:id (PATCH)', async () => {
  //   const membershipId = 6; // Replace with a valid membership ID
  //   const updateMembershipDto: any = {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     membershipType: 'Annual Basic',
  //     email: 'john.doe@example.com',
  //     startDate: new Date('2024-01-01'),
  //     dueDate: new Date('2025-01-01'),
  //     totalAmount: 500,
  //     isFirstMonth: true,
  //     invoiceLink: 'http://example.com/invoice/1',
  //   };
  //
  //   return  request(await app.getHttpServer())
  //     .patch(`/api/v1/memberships/${membershipId}`)
  //     .send(updateMembershipDto)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body.data).toHaveProperty('id', membershipId);
  //       expect(response.body.data.firstName).toBe(
  //         updateMembershipDto.firstName,
  //       );
  //       expect(response.body.data.lastName).toBe(updateMembershipDto.lastName);
  //     });
  // });
  //
  // it('memberships/:id (DELETE)', async () => {
  //   const membershipId = 1; // Replace with a valid membership ID
  //
  //   return request(await app.getHttpServer())
  //     .delete(`/api/v1/memberships/${membershipId}`)
  //     .expect(200)
  //     .then((response) => {
  //       expect(response.body.message).toBe('Membership removed successfully.');
  //     });
  // });
});
