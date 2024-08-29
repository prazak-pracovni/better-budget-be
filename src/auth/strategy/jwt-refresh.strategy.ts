import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import { AccessTokenPayload } from '../types/access-token.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private _userService: UsersService,
    private _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get('jwtRefreshSecret'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    const authUser = await this._userService.findOne(payload.sub);
    if (!authUser) {
      throw new UnauthorizedException();
    }

    return {
      attributes: authUser,
      refreshTokenExpiresAt: new Date(payload.exp * 1000),
    };
  }
}
