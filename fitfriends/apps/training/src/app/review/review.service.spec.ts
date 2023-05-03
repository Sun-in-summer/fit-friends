import {Test, TestingModule} from '@nestjs/testing';
import {ReviewService} from './review.service';
import {ReviewRepository} from './review.repository';
import { FitTrainingService } from '../fit-training/fit-training.service';
import { FitTrainingRepository } from '../fit-training/fit-training.repository';


describe('ReviewsService', () => {
  let reviewService: ReviewService;
  const FitTrainingServiceProvider = {
    provide: FitTrainingService,
    useFactory: () => ({
      create: jest.fn(),
      getTrainingsCatalog: jest.fn(),
      findTrainings: jest.fn(),
      showTraining: jest.fn(),
      updateTraining: jest.fn(),
      calculateRating: jest.fn(),
      setVideoFilePath: jest.fn()
    })
  };
  const ReviewRepositoryProvider = {
    provide: ReviewRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };
  const FitTrainingRepositoryProvider = {
    provide: FitTrainingRepository,
    useFactory: () => ({
      register: jest.fn(),
      getUsers: jest.fn(),
      getFriends: jest.fn(),
      getUser: jest.fn(),
      findByEmail: jest.fn(),
      updateUser: jest.fn(),
    })
  };

  beforeEach(async () => {
    const reviewsModule: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        ReviewRepository,
        FitTrainingService,
        FitTrainingServiceProvider,
        ReviewRepositoryProvider,
        FitTrainingRepositoryProvider,
      ],
    }).compile();

    reviewService = reviewsModule.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });
});
