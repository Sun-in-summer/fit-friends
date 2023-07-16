import { fillObject } from '@fitfriends/core';
import { BadRequestException, Body, Controller, Get, Res, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Query, RawBodyRequest, Req, UploadedFile, UploadedFiles, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { AuthService } from './auth.service';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithTokenPayload, RequestWithUser , RefreshTokenPayload, TokenPayload} from '@fitfriends/shared-types';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserNewDto } from './dto/create-user-new.dto';
import { UserQuery } from './query/user.query';
import { HttpExceptionFilter } from './http.exception-filter';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import {  FILE_MAX_SIZE, JPG_PNG_REG_EXP, PDF_REG_EXP } from '@fitfriends/shared-constants';
import { getFileInterceptorOptions } from '@fitfriends/core';
import { TraineeRoleGuard } from './guards/trainee-role.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateBasicUserDto } from './dto/create-basic-user.dto';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFiles, UserFilesValidationPipe } from '../pipes/user-files-validation.pipe';
import { diskStorage } from 'multer';
import mime from 'mime';
import { nanoid } from 'nanoid';
import { extname } from 'path';





// @UseFilters(HttpExceptionFilter)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(

    private readonly authService: AuthService,
    // private readonly configService: ConfigService
  ) {}

  SERVER_URL =  "http://localhost:3332/api/auth";

  @Post('register')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  async create(
    @Body() dto: CreateUserNewDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }



  @Post('register-basic')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  async createBasicUser(
    @Body() dto: CreateBasicUserDto ,
    )
    {

    const newUser = await this.authService.registerBasicUser(dto);
    return fillObject(UserRdo, newUser);
  }

   @Post('/:userId/avatar')
   @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './avatars',
      filename: (_req, file, callback) => {
        const filename = nanoid();
        return callback(null, `${filename}${extname(file.originalname)}`);
      }
    })
  }))
  async addAvatar(
    @Param('userId') userId: string ,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    console.log(userId);
    if (!file) {
        throw new BadRequestException('avatar required!');
      }
    const newUser =  await this.authService.addAvatar(userId, `${this.SERVER_URL}${file.path}`);
    return fillObject(UserRdo, newUser);

  }




  @Post('questionnaire')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The questionnaire has been successfully sent.'
  })
  async addQuestionnaireInfo(@Body() dto: QuestionnaireDto ) {
    console.log(dto);
    const newUser = await this.authService.addQuestionnaireInfo(dto);
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

  @UseGuards(JwtAuthGuard)
  @Post('checkAuth')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully checked for auth.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Checking of auth  failed.',
  })
  async checkAuth(@Req() req: RequestWithTokenPayload<TokenPayload>) {
    const { user: tokenPayload } = req;
    const userId = tokenPayload.sub;
    const existUser= await this.authService.getUser(userId);
    return fillObject(UserRdo, existUser);
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
  async update(@Param('id', MongoidValidationPipe) id: string, @Body(new ValidationPipe()) dto: UpdateUserDto){
    const newUser = await  this.authService.updateUser(id, dto);
    return fillObject(UserRdo, newUser);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All users are  found'
  })
  async showAllUsers(){
    const users = await this.authService.getAllUsers();
    return fillObject(UserRdo, users);
  }

  // @Get('/')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'All users are  found'
  // })
  // async showAllUsers(@Query() query?: UserQuery){
  //   const users = await this.authService.getAllUsers();
  //   return fillObject(UserRdo, users);
  // }

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
    description: 'To add  friends to users list of friends'
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
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
    status: HttpStatus.OK,
    description: 'The user is deleted from  friends'
  })
  @UseGuards(JwtAuthGuard)
  @Get('deletefriend/:id')
  @HttpCode(HttpStatus.OK)
  async deleteFriend(
    @Param('id') id: string,
    @Req() req: RequestWithTokenPayload<TokenPayload>
  ) {
    const userId = req.user.sub;
    const friendId = id;
    return await this.authService.deleteFriend(userId, friendId);
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

  @UseGuards(JwtAuthGuard)
  @UseGuards(TraineeRoleGuard)
  @Post('favorites/gym/:gymId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async toggleFavoriteGym(
    @Param('gymId', new ValidationPipe) gymId: number,
    @Req() request: RequestWithTokenPayload<TokenPayload>){

      const { user: tokenPayload } = request;
      const id=  tokenPayload.sub;
      const newUser = await  this.authService.toggleFavoriteGym(gymId,id);
      return fillObject(UserRdo, newUser);
  }


  @UseGuards(JwtAuthGuard)
  @Get('favorites/gym')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async getFavoriteGymsList(
      @Req() request: RequestWithTokenPayload<TokenPayload>){
      const { user: tokenPayload } = request;
      const id=  tokenPayload.sub;
      const gyms = await  this.authService.getFavoriteGymList(id);
      return gyms;
  }

  @UseGuards(JwtAuthGuard)
  @Post('subscription/:coachId')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async addSubscriptionOnCoachTrainings (
    @Param('coachId') coachId: string,
    @Req() request: RequestWithTokenPayload<TokenPayload>) {
      const {user : TokenPayload} = request;
      const userId = TokenPayload.sub;
      const subscription = await this.authService.addSubscriptionOnCoach(coachId, userId);
      return subscription;
  }


  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars'});
  }



}



