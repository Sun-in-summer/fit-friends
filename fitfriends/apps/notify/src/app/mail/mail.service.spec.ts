import {Test, TestingModule} from '@nestjs/testing';
import {MailService} from './mail.service';
import {MailerService} from '@nestjs-modules/mailer';


describe('MailService', () => {
  let mailService: MailService;

  const MailServiceProvider = {
    provide: MailerService,
    useFactory: () => ({
      sendMail: jest.fn(),
      addTransporter: jest.fn()
    })
  };

  beforeEach(async () => {
    const reviewsModule: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        MailerService,
        MailServiceProvider
      ]
    }).compile();

    mailService = reviewsModule.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });
});
