import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AccessTokenPayload } from './types/access-token.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _usersService: UsersService,
    private readonly _configService: ConfigService,
  ) {}

  async register(user: CreateUserDto, res: Response): Promise<void> {
    const existingUser = await this._usersService.findOne({ email: user.email });
    if (existingUser) {
      throw new BadRequestException('User with this email address already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };

    const createdUser = await this._usersService.create(newUser);
    this.login(createdUser, res);
  }

  async login(user: User, res: Response): Promise<void> {
    const payload: AccessTokenPayload = { email: user.email, sub: user.id };

    const accessToken = this._jwtService.sign(payload, {
      secret: this._configService.get('JWT_SECRET'),
      expiresIn: this._configService.get('JWT_EXPIRATION_TIME'),
    });

    const refreshToken = this._jwtService.sign(payload, {
      secret: this._configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this._configService.get('JWT_REFRESH_EXPIRATION_TIME'),
    });

    await this._usersService.updateRefreshToken(user.id, await bcrypt.hash(refreshToken, 10));

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1000 * 60),
      sameSite: 'none',
    });
    res.json({ accessToken });
  }

  async logout(req: Request, res: Response): Promise<HttpStatus> {
    const refreshToken = req.cookies.refreshToken;
    const user = await this._usersService.findOne({ refreshToken: refreshToken });
    if (!user) {
      res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
      return HttpStatus.NO_CONTENT;
    }

    await this._usersService.updateRefreshToken(user.id, '');
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    return HttpStatus.NO_CONTENT;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this._usersService.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async validateUserRefreshToken(refreshToken: string, id: string): Promise<User> {
    const user: User = await this._usersService.findOne({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const authenticated = bcrypt.compareSync(refreshToken, user.refreshToken);

    if (!authenticated) {
      throw new BadRequestException('Invalid refresh token');
    }
    return user;
  }
}
