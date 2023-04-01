import { Body, Post, Controller, Delete, Param, HttpCode, HttpStatus, Get, Patch } from '@nestjs/common';
import { GymService } from './gym.service';
import { CreatedGymRdo } from './rdo/created-gym.rdo';
import { fillObject } from '@fitfriends/core';
import { CreateGymDto } from './dto/create-gym.dto';


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
    const gyms = await this.gymService.getCategories();
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
    const updatedGym = await this.gymService.updateCategory(gymId, dto)
    return fillObject(CreatedGymRdo, updatedGym);
  }
}
