import {Test, TestingModule} from '@nestjs/testing';
import {TrainingDiaryService} from './training-diary.service';
import {TrainingDiaryController} from './training-diary.controller';
import {CreateTrainingDiaryDto} from './dto/create-training-diary.dto';
import { UserRole } from '@fitfriends/shared-types';

describe('TrainingsDiaryController', () => {
  let trainingDiaryController: TrainingDiaryController;
  let trainingDiaryService: TrainingDiaryService;
  const ServiceProvider = {
    provide: TrainingDiaryService,
    useFactory: () => ({
      createTrainingDiary: jest.fn(),
      getTrainingDiariesForUser: jest.fn(),
      getTrainingDiariesByUserId : jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [TrainingDiaryController],
        providers: [
          TrainingDiaryService,
          ServiceProvider
        ]
      })
      .compile();

    trainingDiaryController = moduleRef.get<TrainingDiaryController>(TrainingDiaryController);
    trainingDiaryService = moduleRef.get<TrainingDiaryService>(TrainingDiaryService);
  });

  it('should be defined', () => {
    expect(trainingDiaryController).toBeDefined();
  });

  it("calling createTrainingsDiary method", () => {
    const dto = new CreateTrainingDiaryDto();
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Trainee,
      email: ''
    }};

    trainingDiaryController.create(dto, req);
    expect(trainingDiaryService.createTrainingDiary).toHaveBeenCalled();
  });

  it("calling getTrainingsDiaries method", () => {
    const query ={
      limit:5,
      page: 1
    }
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Coach,
      email: ''
    }};

    trainingDiaryController.getTrainingDiariesForUser(query, req);
    expect(trainingDiaryService.getTrainingDiariesByUserId).toHaveBeenCalled();
  });
});
