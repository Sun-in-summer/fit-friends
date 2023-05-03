import {Test, TestingModule} from '@nestjs/testing';
import {TrainingDiaryService} from './training-diary.service';
import {TrainingDiaryRepository} from './training-diary.repository';

describe('TrainingDiaryService', () => {
  let trainingDiaryService: TrainingDiaryService;
  const TrainingDiaryRepositoryProvider = {
    provide: TrainingDiaryRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingDiaryService,
        TrainingDiaryRepository,
        TrainingDiaryRepositoryProvider
      ],
    }).compile();

    trainingDiaryService = module.get<TrainingDiaryService>(TrainingDiaryService);
  });

  it('should be defined', () => {
    expect(trainingDiaryService).toBeDefined();
  });
});
