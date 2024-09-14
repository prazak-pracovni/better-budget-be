import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private _userRepository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    return this._userRepository.save(createUserDto);
  }

  findAll() {
    return this._userRepository.find();
  }

  findOneByEmail(email: string) {
    return this._userRepository.findOneBy({ email });
  }

  findOneById(id: string) {
    return this._userRepository.findOneBy({ id });
  }

  findOneByRefreshToken(refreshToken: string) {
    return this._userRepository.findOneBy({ refreshToken });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this._userRepository.update(id, updateUserDto);
  }

  updateRefreshToken(id: string, refreshToken: string) {
    return this._userRepository.update(id, { refreshToken });
  }

  remove(id: string) {
    return this._userRepository.delete(id);
  }
}
