import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TokenPayload } from '@fitfriends/shared-types';
import { jwtOptions } from 'apps/users/src/config/jwt.config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
{
  constructor(
    @Inject(jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: TokenPayload) {
    return payload;
  }
}
