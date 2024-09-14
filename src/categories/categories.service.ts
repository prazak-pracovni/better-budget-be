import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private _categoryRepository: Repository<Category>;

  create(createCategoryDto: CreateCategoryDto) {
    return this._categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this._categoryRepository.find();
  }

  findOne(id: string) {
    return this._categoryRepository.findOneBy({ id });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this._categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this._categoryRepository.delete(id);
  }
}
