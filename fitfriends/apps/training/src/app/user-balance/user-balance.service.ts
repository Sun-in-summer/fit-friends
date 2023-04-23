import { UserBalance } from '@fitfriends/shared-types';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserBalanceRepository } from './user-balance.repository';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UserBalanceEntity } from './user-balance.entity';
import { UserBalanceQuery } from './query/user-balance.query';


@Injectable()
export class UserBalanceService {
  constructor(
    private readonly userBalanceRepository: UserBalanceRepository
  ) {}

  async createFoodDiary(dto: CreateUserBalanceDto, userId: string): Promise<UserBalance> {


    const userBalanceEntity = new UserBalanceEntity({...dto, userId: userId } );
    return this.userBalanceRepository.create(userBalanceEntity);
  }

  async deleteFoodDiary(id: number): Promise<void> {
    this.userBalanceRepository.destroy(id);
  }



   async getFoodDiaryById(id: number, ): Promise<UserBalance> {
    const userBalance = this.userBalanceRepository.findById(id);
    return  userBalance;
  }



  async getFoodDiariesByUserId(userId: string, query?: UserBalanceQuery): Promise<UserBalance[]> {
    return this.userBalanceRepository.find(userId, query);
  }

  async updateFoodDiary(id: number, dto: CreateUserBalanceDto, userId: string): Promise<UserBalance> {
    const existUserBalance= await this.getFoodDiaryById(id);

    if (existUserBalance.userId !== userId) {
      throw new ForbiddenException('Редактировать  может только автор'); //!!!! исправить логику!
    }

    return this.userBalanceRepository.update(id, new UserBalanceEntity(dto));
  }

}
