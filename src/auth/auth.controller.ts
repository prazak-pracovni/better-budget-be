import { Controller, Post, UseGuards, Request, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AccessToken } from './types/access-token.type';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  @Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<AccessToken | BadRequestException> {
    return this._authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerBody: CreateUserDto): Promise<AccessToken | BadRequestException> {
    return await this._authService.register(registerBody);
  }

  @Throttle({
    short: { limit: 1, ttl: 1000 },
    long: { limit: 2, ttl: 60000 },
  })
  @UseGuards(JwtRefreshAuthGuard)
  @Public()
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return this._authRefreshTokenService.generateTokenPair(
      req.user,
      req.headers.authorization?.split(' ')[1],
      req.user.refreshTokenExpiresAt,
    );
  }
}
