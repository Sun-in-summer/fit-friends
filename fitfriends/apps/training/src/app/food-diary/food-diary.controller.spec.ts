import {Test, TestingModule} from '@nestjs/testing';
import {FoodDiaryController} from './food-diary.controller';
import {FoodDiaryService} from './food-diary.service';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { UserRole } from '@fitfriends/shared-types';


describe('FoodDiaryController', () => {
  let foodDiaryController: FoodDiaryController;
  let foodDiaryService: FoodDiaryService;
  const ApiServiceProvider = {
    provide: FoodDiaryService,
    useFactory: () => ({
      createFoodDiary: jest.fn(),
      getFoodDiaries: jest.fn(),
      showFoodDiary: jest.fn(),
      updateFoodDiary: jest.fn(),
      deleteFoodDiary: jest.fn(),
      getFoodDiariesByUserId: jest.fn(),
      getFoodDiaryById: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [FoodDiaryController],
        providers: [
          FoodDiaryService,
          ApiServiceProvider
        ]
      })
      .compile();

    foodDiaryController = moduleRef.get<FoodDiaryController>(FoodDiaryController);
    foodDiaryService = moduleRef.get<FoodDiaryService>(FoodDiaryService);
  });

  it('should be defined', () => {
    expect(foodDiaryController).toBeDefined();
  });

  it("calling createFoodDiary method", () => {
    const dto = new CreateFoodDiaryDto();
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Trainee,
      email: ''
    }};

    foodDiaryController.create(dto, req);
    expect(foodDiaryService.createFoodDiary).toHaveBeenCalled();
  });

  it("calling getFoodDiaries method", () => {
    const query = {
      limit: 20,
      page: 1
    }
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Trainee,
      email: ''
    }};

    foodDiaryController.getFoodDiariesForUser(query, req);
    expect(foodDiaryService.getFoodDiariesByUserId).toHaveBeenCalled();
  });

  it("calling showFoodDiary method", () => {
    const id = '';
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.Trainee,
      email: ''
    }};

    foodDiaryController.getFoodDiaryById(id);
    expect(foodDiaryService.getFoodDiaryById).toHaveBeenCalled();
  });

  it("calling updateFoodDiary method", () => {
    const id = '';
    const dto = new CreateFoodDiaryDto();
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Trainee,
      email: ''
    }};

    foodDiaryController.update(id, dto, req);
    expect(foodDiaryService.updateFoodDiary).toHaveBeenCalled();
  });

  it("calling deleteFoodDiary method", () => {
    const id = '';

    foodDiaryController.destroy(id);
    expect(foodDiaryService.deleteFoodDiary).toHaveBeenCalled();
  });
});
