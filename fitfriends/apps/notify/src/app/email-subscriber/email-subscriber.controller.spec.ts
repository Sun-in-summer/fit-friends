import {Test, TestingModule} from '@nestjs/testing';
import {EmailSubscriberController} from './email-subscriber.controller'
import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';


describe('SubscriptionController', () => {
  let emailSubscriberController: EmailSubscriberController;
  let emailSubscriberService: EmailSubscriberService;
  const ServiceProvider = {
    provide: EmailSubscriberService,
    useFactory: () => ({
      addSubscriber: jest.fn(),
      addSubscriberToCoach: jest.fn(),
      notifyFriend: jest.fn(),
      notifyYouAreFriends: jest.fn(),
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [EmailSubscriberController],
        providers: [
          EmailSubscriberService,
          ServiceProvider
        ]
      })
      .compile();

    emailSubscriberController = moduleRef.get<EmailSubscriberController>(EmailSubscriberController);
    emailSubscriberService = moduleRef.get<EmailSubscriberService>(EmailSubscriberService);
  });

  it('should be defined', () => {
    expect(emailSubscriberController).toBeDefined();
  });

  it("calling addSubscriber method", () => {
    const dto = new CreateSubscriberDto()
    emailSubscriberController.create(dto);
    expect(emailSubscriberService.addSubscriber).toHaveBeenCalled();
  });

  // it("calling addNewTrainingMailSendTask method", () => {
  //   const trainingData = {
  //     coachId: '',
  //     coachName: '',
  //     trainingType: '',
  //     trainingTitle: '',
  //     trainingDescription: '',
  //     trainingGender: '',
  //     trainingLevel: '',
  //     trainingDuration: '',
  //     trainingCaloriesCount: 1000,
  //     trainingPrice: 2000
  //   };
  //   emailSubscriberController.addNewTrainingMailSendTask(trainingData);
  //   expect(emailSubscriberService.addNewTrainingMailSendTask).toHaveBeenCalled();
  // });

  // it("calling createCoach method", () => {
  //   const trainingData = {
  //     coachId: '',
  //     coachName: '',
  //     coachEmail: '',
  //     avatarUrl: '',
  //     gender: Gender.Undefined,
  //     birthday: '',
  //     location: SubwayStation.Petrogradskaya,
  //     trainingLevel: TrainingLevel.Amateur,
  //     trainingTypes: [TrainingType.Aerobics]
  //   };
  //   emailSubscriberController.createCoach(trainingData);
  //   expect(emailSubscriberService.createCoach).toHaveBeenCalled();
  // });

  // it("calling toggleSubscriberStatus method", () => {
  //   const id = '';
  //   const req = {user: {
  //     sub: '',
  //     userName: '',
  //     userRole: UserRole.User,
  //     email: ''
  //   }};

  //   emailSubscriberController.toggleSubscriberStatus(id, req);
  //   expect(emailSubscriberService.toggleSubscriberStatus).toHaveBeenCalled();
  // });
});
