import { CommandEvent, PersonalTrainingOrder } from '@fitfriends/shared-types';
import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PersonalTrainingOrderRepository } from './personal-training-order.perository';
import { CreatePersonalTrainingOrderDto } from './dto/create-personal-training-order.dto';
import { PersonalTrainingOrderEntity } from './personal-training-order.entity';
import { PersonalTrainingOrderExceptionMessage, RABBITMQ_SERVICE } from './personal-training-order.constant';
import { PersonalTrainingOrderQuery } from './query/personal-training-order.query';
import { UpdatePersonalTrainingOrderDto } from './dto/update-personal-training-order.dto';
import { OrderStatus } from 'libs/shared-types/src/lib/order.types/order-status.enum';
import { UpdateStatusPersonalTrainingOrderDto } from './dto/update-status-personal-training-order.dto';


@Injectable()
export class PersonalTrainingOrderService {
  constructor(
    private readonly personalTrainingOrderRepository: PersonalTrainingOrderRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async createPersonalTrainingOrder(dto: CreatePersonalTrainingOrderDto, userId: string): Promise<PersonalTrainingOrder> {

    if (dto.conductorId === userId) {
      throw new BadRequestException(
        PersonalTrainingOrderExceptionMessage.ConductorError
      );
    }


    const personalTrainingOrderEntity = new PersonalTrainingOrderEntity({
      ...dto,
      initiatorId: userId,
      status: OrderStatus.InProcess
    });
    const createdPersonalTrainingOrder = await this.personalTrainingOrderRepository.create(personalTrainingOrderEntity);

    this.rabbitClient.emit(
      { cmd: CommandEvent.AddPersonalTrainingOrder},
      {
        initiatorId: userId,
        conductorId: createdPersonalTrainingOrder.conductorId,
        status: createdPersonalTrainingOrder.status,
      }
    );

    return createdPersonalTrainingOrder;
  }

  async deletePersonalTrainingOrder(id: number): Promise<void> {
    this.personalTrainingOrderRepository.destroy(id);
  }



   async getPersonalTrainingOrderById(id: number, ): Promise<PersonalTrainingOrder | null> {
    const personalTrainingOrder = this.personalTrainingOrderRepository.findById(id);
    return  personalTrainingOrder;
  }



  async getPersonalTrainingOrders(query: PersonalTrainingOrderQuery): Promise<PersonalTrainingOrder[]> {

    return this.personalTrainingOrderRepository.find(query);
  }

  async updatePersonalTrainingOrder(id: number, dto: UpdatePersonalTrainingOrderDto, userId: string): Promise<PersonalTrainingOrder | null> {
    const existPersonalTrainingOrder = await this.personalTrainingOrderRepository.findById(id);
    const existStatus = existPersonalTrainingOrder.status;

    if (!existPersonalTrainingOrder) {
      throw new NotFoundException(PersonalTrainingOrderExceptionMessage.NotFound);
    }

    if (existPersonalTrainingOrder.initiatorId !== userId) {
      throw new ForbiddenException(PersonalTrainingOrderExceptionMessage.NotOwnPersonalTrainingOrder);
    }

    return this.personalTrainingOrderRepository.update(id, new PersonalTrainingOrderEntity({...dto, status: existStatus}));
  }


    async updatePersonalTrainingOrderStatus(id: number, dto: UpdateStatusPersonalTrainingOrderDto, conductorId: string): Promise<PersonalTrainingOrder | null> {

      const { status } = dto;
      const existPersonalTrainingOrder = await this.personalTrainingOrderRepository.findById(id);

    if (!existPersonalTrainingOrder) {
      throw new NotFoundException(PersonalTrainingOrderExceptionMessage.NotFound);
    }

    if (existPersonalTrainingOrder.initiatorId === conductorId) {
      throw new ForbiddenException(PersonalTrainingOrderExceptionMessage.OwnPersonalTraining);
    }

    if (existPersonalTrainingOrder.conductorId !== conductorId) {


      throw new ForbiddenException(
        PersonalTrainingOrderExceptionMessage.NotOwnPersonalTrainingOrder
      );
    }

     if (existPersonalTrainingOrder.status === status) {
      throw new ConflictException(PersonalTrainingOrderExceptionMessage.StatusConflict);
    }


    return this.personalTrainingOrderRepository.updateStatus(id, status);
  }
}



