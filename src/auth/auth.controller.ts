import { Controller, Post, UseGuards, Request, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this._authService.login(req.user, response);
  }

  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) response: Response): Promise<HttpStatus> {
    return await this._authService.logout(req, response);
  }

  @Post('register')
  async register(@Body() registerBody: CreateUserDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this._authService.register(registerBody, response);
  }

  @Throttle({
    short: { limit: 1, ttl: 1000 },
    long: { limit: 2, ttl: 60000 },
  })
  @UseGuards(JwtRefreshAuthGuard)
  @Public()
  @Post('refresh-token')
  async refreshToken(@Request() req, @Res({ passthrough: true }) response: Response): Promise<void> {
    await this._authService.login(req.user, response);
  }
}
