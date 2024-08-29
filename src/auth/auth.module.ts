import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthRefreshTokenService } from './auth-refresh-token.service';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRefreshToken } from './entities/auth-refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRefreshToken]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.getOrThrow<string>('ACCESS_TOKEN_VALIDITY_DURATION_IN_MIN')),
        },
      }),
    }),
  ],
  providers: [AuthService, AuthRefreshTokenService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
