import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenPayload } from '@fitfriends/shared-types';
import { jwtOptions } from 'apps/users/src/config/jwt.config';
import { Request } from 'express';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh')
{
  constructor(
    @Inject(jwtOptions.KEY) private readonly jwtConfig: ConfigType<typeof jwtOptions>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: RefreshTokenPayload) {
    if (!await this.refreshTokenService.isExists(payload.refreshTokenId)){
      throw new TokenNotExistsException(payload.refreshTokenId);
    }
    return payload;
  }
}
