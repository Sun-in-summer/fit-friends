import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, UserRole } from '@fitfriends/shared-types';




const WRONG_ROLE_MESSAGE = 'Неверная роль пользователя';

@Injectable()
export class RoleStrategy extends PassportStrategy(Strategy, 'role') {
  constructor(
    private readonly configService: ConfigService,

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessSecret'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
      if (payload.role !== UserRole.Coach) {
        throw new ForbiddenException(WRONG_ROLE_MESSAGE);
      }

    return payload;
  }
}


