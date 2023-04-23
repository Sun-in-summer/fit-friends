import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch,  Req, UseGuards, Query  } from '@nestjs/common';
import { fillObject } from '@fitfriends/core';
import { RequestWithTokenPayload, TokenPayload } from '@fitfriends/shared-types';

import { UserBalanceService } from './user-balance.service';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { TraineeRoleGuard } from '../guards/trainee-role.guard';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { CreatedUserBalanceRdo } from './rdo/created-user-balance.rdo';
import { UserBalanceQuery } from './query/user-balance.query';



@Controller('user-balance')
export class UserBalanceController {
  constructor(
    private readonly userBalanceService: UserBalanceService
  ) {}



  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Post('/')
  async create(@Body() dto: CreateUserBalanceDto, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const newUserBalance = await this.userBalanceService.createFoodDiary(dto, userId);
    return fillObject(CreatedUserBalanceRdo, newUserBalance);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Get('/')
  async getFoodDiariesForUser(@Query () query: UserBalanceQuery, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const existUserBalance = await this.userBalanceService.getFoodDiariesByUserId(userId, query);
    return fillObject(CreatedUserBalanceRdo, existUserBalance);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Get('/:id')
  async getFoodDiaryById(@Param('id')
id: string) {
    const userBalanceId = parseInt(id, 10);
    const existUserBalance = await this.userBalanceService.getFoodDiaryById(userBalanceId);
    return fillObject(CreatedUserBalanceRdo, existUserBalance);
  }


  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const userBalanceId = parseInt(id, 10);
    this.userBalanceService.deleteFoodDiary(userBalanceId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateUserBalanceDto, @Req()
req: RequestWithTokenPayload<TokenPayload>) {
    const userId = req.user.sub;
    const userBalanceId = parseInt(id, 10);
    const updatedUserBalance = await this.userBalanceService.updateFoodDiary(userBalanceId, dto, userId)
    return fillObject(CreatedUserBalanceRdo, updatedUserBalance);
  }

}



