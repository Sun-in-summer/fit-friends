import { fillObject } from '@fitfriends/core';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { AuthService } from './auth.service';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithTokenPayload, RequestWithUser , RefreshTokenPayload} from '@fitfriends/shared-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { HttpExceptionFilter } from './http.exception-filter';
import { CreateCoachUserDto } from './dto/create-coach-user.dto';
import { CreateTraineeUserDto } from './dto/create-trainee-user.dto';
import { CreateUserNewDto } from './dto/create-user-new.dto';


// @UseFilters(HttpExceptionFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  async create(@Body() dto: CreateUserNewDto ) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(@Req() request: RequestWithUser) {
    const {user }= request;
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;
     return this.authService.loginUser({
      firstname: tokenPayload.firstname,
      role: tokenPayload.role,
      email: tokenPayload.email,
      _id: tokenPayload.sub
    }, tokenPayload.refreshTokenId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  async getUser(@Param('id', MongoidValidationPipe) id: string){
    const existUser= await this.authService.getUser(id);
    return fillObject(UserRdo, existUser);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({status: HttpStatus.OK, description: 'The user has been successfully updated '})
  async update(@Param('id', MongoidValidationPipe) id: string, @Body() dto: CreateUserNewDto){
    const newUser = await  this.authService.updateUser(id, dto);
    return fillObject(UserRdo, newUser);
  }
}
