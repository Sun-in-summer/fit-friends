import {Test, TestingModule} from '@nestjs/testing';
import {GymController} from './gym.controller';
import {GymService} from './gym.service';
import { UserRole } from '@fitfriends/shared-types';


describe('GymsController', () => {
  let gymController: GymController;
  let gymService: GymService;
  const ServiceProvider = {
    provide: GymService,
    useFactory: () => ({
      createGym: jest.fn(),
      deleteGym: jest.fn(),
      getGym: jest.fn(),
      getGyms: jest.fn(),
      updateGym: jest.fn(),
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [GymController],
        providers: [
          GymService,
          ServiceProvider
        ]
      })
      .compile();

    gymController = moduleRef.get<GymController>(GymController);
    gymService = moduleRef.get<GymService>(GymService);
  });

  it('should be defined', () => {
    expect(gymController).toBeDefined();
  });

  it("calling getGyms method", () => {
    const req = {user: {
      sub: '',
      firstname: '',
      role: UserRole.Trainee,
      email: ''
    }};
    const query = {
      minPrice: 1000
    };

    gymController.index();
    expect(gymService.getGyms).toHaveBeenCalled();
  });


});
