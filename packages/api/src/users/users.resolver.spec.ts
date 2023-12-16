import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { userStub } from './stubs/users.stub';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserRecord } from 'firebase-admin/auth';

import { UsersService } from './users.service';
jest.mock('./users.service');

// "npx jest src/users/users.resolver.spec.ts" -> uitvoeren testen

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let mockedService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    mockedService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
