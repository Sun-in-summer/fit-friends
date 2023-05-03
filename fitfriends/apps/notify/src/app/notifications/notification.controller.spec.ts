import {Test, TestingModule} from '@nestjs/testing';
import {NotificationController} from './notification.controller';
import {NotificationService} from './notification.service';


describe('NotificationsController', () => {
  let notificationController: NotificationController;
  let notificationService: NotificationService;
  const ServiceProvider = {
    provide: NotificationService,
    useFactory: () => ({
      createNotification: jest.fn(),
      getNotifications: jest.fn(),
      deleteNotification: jest.fn(),
      getNotificationsByUserId: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [NotificationController],
        providers: [
          NotificationService,
          ServiceProvider
        ]
      })
      .compile();

    notificationController = moduleRef.get<NotificationController>(NotificationController);
    notificationService = moduleRef.get<NotificationService>(NotificationService);
  });

  it('should be defined', () => {
    expect(notificationController).toBeDefined();
  });

  it("calling getNotificationsByUserId method", () => {
    const id = '';
    notificationController.show(id);
    expect(notificationService.getNotificationsByUserId).toHaveBeenCalled();
  });

  it("calling deleteNotification method", () => {
    const id = '';
    notificationController.destroy(id);
    expect(notificationService.deleteNotification).toHaveBeenCalled();
  });

});
