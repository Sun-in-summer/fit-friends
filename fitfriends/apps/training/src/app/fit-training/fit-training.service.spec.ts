import {Test, TestingModule} from '@nestjs/testing';
import {RABBITMQ_SERVICE} from './fit-training.constant';
import {FitTrainingService} from './fit-training.service';
import {FitTrainingRepository} from'./fit-training.repository';


describe('FitTrainingService', () => {
  let fitTrainingService: FitTrainingService;
  const ApiRepositoryProvider = {
    provide: FitTrainingRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          FitTrainingRepository,
          FitTrainingService,
          ApiRepositoryProvider,
          {
            provide: RABBITMQ_SERVICE,
            useValue: {
              getResult: jest.fn(),
            },
          }
        ]
      })
      .compile();

      fitTrainingService = moduleRef.get<FitTrainingService>(FitTrainingService);
  });

  it('should be defined', () => {
    expect(fitTrainingService).toBeDefined();
  });
});
