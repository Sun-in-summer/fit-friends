import { Subscription } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { FitSubscriptionRepository } from './fit-subscription.repository';
import { CreateFitSubscriptionDto } from './dto/create-fit-subscription.dto';
import { FitSubscriptionEntity } from './fit-subscription.entity';


@Injectable()
export class FitSubscriptionService {
  constructor(
    private readonly fitSubscriptionRepository: FitSubscriptionRepository
  ) {}

  async createSubscription(dto: CreateFitSubscriptionDto): Promise<Subscription> {
    const fitSubscriptionEntity = new FitSubscriptionEntity({...dto} );
    return this.fitSubscriptionRepository.create(fitSubscriptionEntity);
  }

  async deleteSubscription(id: number): Promise<void> {
    this.fitSubscriptionRepository.destroy(id);
  }



   async getSubscriptionById(id: number, ): Promise<Subscription> {
    const fitSubscription = this.fitSubscriptionRepository.findById(id);
    return  fitSubscription;
  }


}
