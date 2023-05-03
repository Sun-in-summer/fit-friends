import {Test, TestingModule} from '@nestjs/testing';
import {ConfigService} from '@nestjs/config';
import {FitTrainingService} from './fit-training.service';
import {FitTrainingController} from './fit-training.controller';
import { CreateFitTrainingDto } from './dto/create-fit-training.dto';
import { UserRole } from '@fitfriends/shared-types';



describe('TrainingsController', () => {
  let fitTrainingController: FitTrainingController;
  let fitTrainingService: FitTrainingService;
  const ApiServiceProvider = {
    provide: FitTrainingService,
    useFactory: () => ({
    createTraining: jest.fn(),
    deleteTraining: jest.fn(),
    getTrainings : jest.fn(),
    getAllTrainings : jest.fn(),
    updateTraining : jest.fn(),
    setFile : jest.fn(),
    getTrainingById: jest.fn(),
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [FitTrainingController],
        providers: [
          FitTrainingService,
          ConfigService,
          ApiServiceProvider
        ]
      })
      .compile();

    fitTrainingController = moduleRef.get<FitTrainingController>(FitTrainingController);
    fitTrainingService = moduleRef.get<FitTrainingService>(FitTrainingService);
  });

  it('should be defined', () => {
    expect(fitTrainingController).toBeDefined();
  });

  it("calling createTraining method", () => {
    const dto = new CreateFitTrainingDto();
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Coach,
      email: ''
    }};

    fitTrainingController.create(dto, req);
    expect(fitTrainingService.createTraining).toHaveBeenCalled();
  });

  it("calling showTrainings method", () => {
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Trainee,
      email: ''
    }};
    const query = {
      minPrice: 1000,
      limit: 10,
      page: 2,
      trainingType: ['бокс']
    };

    fitTrainingController.showTrainings(query, req);
    expect(fitTrainingService.getAllTrainings).toHaveBeenCalled();
  });

  it("calling index method", () => {
    const req = {user: {
      sub: '',
      firstname: '',
      role: '',
      email: ''
    }};
    const query = {
      minPrice: 1000,
      limit: 10,
      page: 2,
      trainingType: ['бокс']
    };

    fitTrainingController.index(query, req);
    expect(fitTrainingService.getTrainings).toHaveBeenCalled();
  });

  it("calling show method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      firstname: '',
      role: '',
      email: ''
    }};

    fitTrainingController.show(id, req);
    expect(fitTrainingService.getTrainingById).toHaveBeenCalled();
  });

  it("calling updateTraining method", () => {
    const id = '';
    const dto = new CreateFitTrainingDto();
    const req = {user: {
      sub: '',
      firstname: '',
      role: '',
      email: ''
    }};

    fitTrainingController.update(id, dto, req);
    expect(fitTrainingService.updateTraining).toHaveBeenCalled();
  });
});
