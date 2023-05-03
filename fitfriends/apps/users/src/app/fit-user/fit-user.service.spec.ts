import {Test, TestingModule} from '@nestjs/testing';
import { FitUserService } from './fit-user.service';

describe('UsersService', () => {
  let service: FitUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitUserService],
    }).compile();

    service = module.get<FitUserService>(FitUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
