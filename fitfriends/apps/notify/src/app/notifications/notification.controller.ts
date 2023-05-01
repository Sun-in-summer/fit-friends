import {  Controller, Delete, Param, HttpCode, HttpStatus, Get,  UseGuards, Req  } from '@nestjs/common';
import { RequestWithTokenPayload,  User } from '@fitfriends/shared-types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';


@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('/:userId')
  async show(
    @Param('userId') userId: string,
    @Req() _req: RequestWithTokenPayload<User>) {
    const notifications = await this.notificationService.getNotificationsByUserId(userId);
    return notifications;
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:notificationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('notificationId') notificationId: string) {
      return this.notificationService.deleteNotification(notificationId);
  }


}
