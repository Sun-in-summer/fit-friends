import {Test} from '@nestjs/testing';
import {FitUserController } from './fit-user.controller';
import {FitUserService} from './fit-user.service';



describe('FitUserController', () => {
  let controller: FitUserController;
  let service: FitUserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FitUserController],
      providers: [FitUserService],
    }).compile();

    controller = moduleRef.get<FitUserController>(FitUserController);
    service = moduleRef.get<FitUserService>(FitUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
   it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
