import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private _userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this._userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this._userRepository.find();
  }

  async findOne(query: Partial<User>): Promise<User> {
    return await this._userRepository.findOneBy(query);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this._userRepository.update(id, updateUserDto);
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<UpdateResult> {
    return await this._userRepository.update(id, { refreshToken });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this._userRepository.delete(id);
  }
}
