import {Test, TestingModule} from '@nestjs/testing';
import {EmailSubscriberRepository} from './email-subscriber.repository';
import {EmailSubscriberService} from './email-subscriber.service';
import { MailService } from '../mail/mail.service';




describe('SubscriptionService', () => {
  let emailSubscriberService: EmailSubscriberService;

  let moduleRef: TestingModule;

    const MailServiceProvider = {
    provide: MailService,
    useFactory: () => ({
      sendAddSubscriberMail: jest.fn(),
      sendRemoveSubscriberMail: jest.fn(),
      addNewTrainingMailSendTask: jest.fn()
    })
  };
  const EmailSubscriberRepositoryProvider = {
    provide: EmailSubscriberRepository,
    useFactory: () => ({
      create: jest.fn(),
      findByCoachId: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    moduleRef = await Test.createTestingModule({
        providers: [
        MailService,
        EmailSubscriberService,
        EmailSubscriberRepository,
        MailServiceProvider,
        EmailSubscriberRepositoryProvider
      ],
    })
    .compile();

    emailSubscriberService = moduleRef.get<EmailSubscriberService>(EmailSubscriberService);
  });

  it('should be defined', () => {
    expect(emailSubscriberService).toBeDefined();
  });


});
