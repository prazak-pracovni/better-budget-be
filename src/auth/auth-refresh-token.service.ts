import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { AuthRefreshToken } from './entities/auth-refresh-token.entity';
import { User } from 'src/users/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(AuthRefreshToken)
    private authRefreshTokenRepository: Repository<AuthRefreshToken>,
  ) {}

  async generateRefreshToken(userId: string, currentRefreshToken?: string, currentRefreshTokenExpiresAt?: Date) {
    const newRefreshToken = this.jwtService.sign(
      { sub: userId },
      { secret: this.configService.get('JWT_REFRESH_SECRET'), expiresIn: '30d' },
    );

    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      if (!(await this.isRefreshTokenBlackListed(currentRefreshToken, userId))) {
        throw new Error('Invalid refresh token');
      }

      await this.authRefreshTokenRepository.insert({
        refreshToken: currentRefreshToken,
        expiresAt: currentRefreshTokenExpiresAt,
        userId,
      });
    }

    return newRefreshToken;
  }

  private isRefreshTokenBlackListed(refreshToken: string, userId: string) {
    return this.authRefreshTokenRepository.existsBy({ refreshToken, userId });
  }

  async generateTokenPair(user: User, currentRefreshToken?: string, currentRefreshTokenExpiresAt?: Date) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.generateRefreshToken(user.id, currentRefreshToken, currentRefreshTokenExpiresAt),
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async clearExpiredRefreshTokens() {
    await this.authRefreshTokenRepository.delete({
      expiresAt: LessThanOrEqual(new Date()),
    });
  }
}
