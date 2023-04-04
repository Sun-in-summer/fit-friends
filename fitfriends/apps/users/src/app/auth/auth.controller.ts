import { fillObject } from '@fitfriends/core';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { AuthService } from './auth.service';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { JwtAuthGuard } from '../../../../training/src/app/guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithTokenPayload, RequestWithUser , RefreshTokenPayload, TokenPayload} from '@fitfriends/shared-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserNewDto } from './dto/create-user-new.dto';
import { UserQuery } from './query/user.query';
import { HttpExceptionFilter } from './http.exception-filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import {  FILE_MAX_SIZE, JPG_PNG_REG_EXP, PDF_REG_EXP } from '@fitfriends/shared-constants';
import { getFileInterceptorOptions } from '@fitfriends/core';


// @UseFilters(HttpExceptionFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
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
  async update(@Param('id', MongoidValidationPipe) id: string, @Body(new ValidationPipe()) dto: CreateUserNewDto){
    const newUser = await  this.authService.updateUser(id, dto);
    return fillObject(UserRdo, newUser);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All users are  found'
  })
  async showAllUsers(@Query() query: UserQuery){
    const users = await this.authService.getUsers(query);
    return fillObject(UserRdo, users);
  }

   @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of  friends of authorized user'
  })
  @UseGuards(JwtAuthGuard)
  @Get('friends/:id')
  @HttpCode(HttpStatus.OK)
  async getFriendsList(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload<TokenPayload>)
   {
    const userId = req.user.sub;
    const users=  await this.authService.getFriends(userId);
    return fillObject(UserRdo, users);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user added in friends'
  })
  @UseGuards(JwtAuthGuard)
  @Get('addfriend/:id')
  @HttpCode(HttpStatus.OK)
  async addFriend(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload<TokenPayload>
  ) {
    const userId = req.user.sub;
    const friendId = id;
    return await this.authService.addFriend(userId, friendId);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Uploading route for avatar'
  })
  @UseGuards(JwtAuthGuard)
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar', getFileInterceptorOptions()))
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: JPG_PNG_REG_EXP,
        })
        .addMaxSizeValidator({
          maxSize: FILE_MAX_SIZE
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File,
    @Req() req: RequestWithTokenPayload<TokenPayload>
  ) {

    const user = this.authService.setAvatarPath(req.user.sub, `${file.filename}`);
    return fillObject(UserRdo, user);
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Uploading route for certificate  of coach'
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @Post('certificate/:id')
  @UseInterceptors(FileInterceptor('certificate', getFileInterceptorOptions()))
  public async uploadVideoFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: PDF_REG_EXP,
        })
        .addMaxSizeValidator({
          maxSize: FILE_MAX_SIZE
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File,
    @Req() req: RequestWithTokenPayload<TokenPayload>,
    @Param('id') userId: string,
  ) {
    const field = 'certificate'
    const updatedUser = this.authService.setFile(userId, field, `${file.filename}`);
    return fillObject(UserRdo, updatedUser);
  }


}



