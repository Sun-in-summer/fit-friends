import {Test, TestingModule} from '@nestjs/testing';
import {NotificationRepository} from './notification.repository';
import {NotificationService} from './notification.service';

describe('NotificationsService', () => {
  let notificationService: NotificationService;

  const NotificationRepositoryProvider = {
    provide: NotificationRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      findByUserId: jest.fn()
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        NotificationRepository,
        NotificationRepositoryProvider
      ],
    }).compile();

    notificationService = module.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(notificationService).toBeDefined();
  });
});
