import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private _categoryRepository: Repository<Category>;

  async create(createCategoryDto: CreateCategoryDto, user: User): Promise<Category> {
    const category = new Category();
    Object.assign(category, { ...createCategoryDto, createdBy: user });

    return this._categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this._categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    return this._categoryRepository.findOneBy({ id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return this._categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this._categoryRepository.delete(id);
  }
}
