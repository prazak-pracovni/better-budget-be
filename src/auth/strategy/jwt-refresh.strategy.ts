import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from '../types/access-token.type';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    private readonly _authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request.cookies?.refreshToken]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: AccessTokenPayload): Promise<User> {
    return this._authService.validateUserRefreshToken(request.cookies?.refreshToken, payload.sub);
  }
}
