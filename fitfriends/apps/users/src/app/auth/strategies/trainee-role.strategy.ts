import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, UserRole } from '@fitfriends/shared-types';


const WRONG_ROLE_MESSAGE = 'Неверная роль пользователя';

@Injectable()
export class TraineeRoleStrategy extends PassportStrategy(Strategy, 'trainee-role') {
  constructor(
    private readonly configService: ConfigService,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
      if (payload.role !== UserRole.Trainee) {
        throw new ForbiddenException(WRONG_ROLE_MESSAGE);
      }

    return payload;
  }
}


