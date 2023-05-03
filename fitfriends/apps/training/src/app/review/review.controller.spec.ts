import {Test, TestingModule} from '@nestjs/testing';
import {ReviewService} from './review.service';
import {ReviewController} from './review.controller';
import {CreateReviewDto} from './dto/create-review.dto';


describe('ReviewController', () => {
  let reviewController: ReviewController;
  let reviewService: ReviewService;
  const ServiceProvider = {
    provide: ReviewService,
    useFactory: () => ({
      createReview: jest.fn(),
      getReviews: jest.fn(),
      getReviewsByTrainingId: jest.fn(),
      getReviewsByUserId: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [ReviewController],
        providers: [
          ReviewService,
          ServiceProvider
        ]
      })
      .compile();

    reviewController = moduleRef.get<ReviewController>(ReviewController);
    reviewService = moduleRef.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(reviewController).toBeDefined();
  });

  it("calling createReview method", () => {
    const dto = new CreateReviewDto();
    reviewController.create(dto);
    expect(reviewService.createReview).toHaveBeenCalled();
  });

  it("calling getReviewsByUserId method", () => {
    const id = '';

    reviewController.index(id);
    expect(reviewService.getReviewsByUserId).toHaveBeenCalled();
  });
});
