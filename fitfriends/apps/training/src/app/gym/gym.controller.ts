import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch, UseInterceptors, Req, ParseFilePipeBuilder } from '@nestjs/common';
import { GymService } from './gym.service';
import { CreatedGymRdo } from './rdo/created-gym.rdo';
import { fillObject, getFileInterceptorOptions } from '@fitfriends/core';
import { CreateGymDto } from './dto/create-gym.dto';
import { ApiResponse } from '@nestjs/swagger';
import { RequestWithTokenPayload, TokenPayload } from '@fitfriends/shared-types';
import {  GYM_PHOTOS_MAX_QTY, GYM_PHOTOS_MAX_SIZE, JPG_PNG_REG_EXP } from '@fitfriends/shared-constants';
import { UploadedFiles } from '@nestjs/common/decorators';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('gyms')
export class GymController {
  constructor(
    private readonly gymService: GymService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const gymId = parseInt(id, 10);
    const existGym = await this.gymService.getGym(gymId);
    return fillObject(CreatedGymRdo, existGym);
  }

  @Get('/')
  async index() {
    const gyms = await this.gymService.getGyms();
    return fillObject(CreatedGymRdo, gyms);
  }

  @Post('/')
  async create(@Body() dto: CreateGymDto) {
    const newCategory = await this.gymService.createGym(dto);
    return fillObject(CreatedGymRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const gymId = parseInt(id, 10);
    this.gymService.deleteGym(gymId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateGymDto) {
    const gymId = parseInt(id, 10);
    const updatedGym = await this.gymService.updateGym(gymId, dto)
    return fillObject(CreatedGymRdo, updatedGym);
  }


  @ApiResponse({
    type: CreatedGymRdo,
    status: HttpStatus.OK,
    description: 'Uploading route for photos of gym'
  })
  @Post('photos/:id')
  @UseInterceptors(FilesInterceptor('photos', GYM_PHOTOS_MAX_QTY,  getFileInterceptorOptions()))
  public async uploadPhotos(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: JPG_PNG_REG_EXP,
        })
        .addMaxSizeValidator({
          maxSize: GYM_PHOTOS_MAX_SIZE
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) files: Array<Express.Multer.File>,
    @Req() req: RequestWithTokenPayload<TokenPayload>,
    @Param('id') id: string,
  ) {
    const gymId = parseInt(id, 10);
    const photos = files.map((file) => file.filename);
    const updatedGym = this.gymService.setFiles(gymId, photos);
    return fillObject(CreatedGymRdo, updatedGym);
  }
}



