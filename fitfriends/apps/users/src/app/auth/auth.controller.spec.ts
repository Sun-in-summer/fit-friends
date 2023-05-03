import {Test, TestingModule} from '@nestjs/testing';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import { CreateUserNewDto } from './dto/create-user-new.dto';



describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const ApiServiceProvider = {
    provide: AuthService,
    useFactory: () => ({
      register:  jest.fn(),
      loginUser: jest.fn(),
      create: jest.fn(),
      login: jest.fn(),
      refresh: jest.fn(),
      getUser: jest.fn(),
      update: jest.fn(),
      showAllUsers: jest.fn(),
      getFriendsList: jest.fn(),
      addFriend: jest.fn()
    })
  };


  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          AuthService,
          ApiServiceProvider
        ]
      })
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(AuthController).toBeDefined();
  });

  it("calling create method", () => {
    const dto = new CreateUserNewDto();
    authController.create(dto);
    expect(authService.register).toHaveBeenCalled();
  })

  it("calling login method", () => {
    const req = {
      user: {
        email: '',
        password: '',
        avatar: '',
        traineeOrCoach: {
          trainingTime: '',
          caloriesToDrop: 100,
          caloriesToSpendPerDay: 100,
          isReadyForTraining: true,
          trainingLevel: 'любитель',
          trainingType: [''],
          role: ''
        },
        firstname: '',
        passwordHash: '',
        gender: '',
        role: '',
        place: '',
        trainingLevel: '',
        trainingType: [''],
        sentRequestForFriends: [''],
        gotRequestForFriends: ['']
      }
    };

    authController.login(req);
    expect(authService.loginUser).toHaveBeenCalled();
  })
})
