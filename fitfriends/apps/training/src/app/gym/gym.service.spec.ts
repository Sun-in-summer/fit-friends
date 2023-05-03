import {Test, TestingModule} from '@nestjs/testing';
import {GymRepository} from './gym.repository';
import {GymService} from './gym.service';

describe('GymsService', () => {
  let gymService: GymService;
  const GymRepositoryProvider = {
    provide: GymRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      getTrainingPurchases: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GymService,
        GymRepository,
        GymRepositoryProvider,

      ],
    }).compile();

    gymService = module.get<GymService>(GymService);
  });

  it('should be defined', () => {
    expect(gymService).toBeDefined();
  });
});
