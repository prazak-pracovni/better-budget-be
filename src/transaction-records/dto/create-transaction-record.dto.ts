import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ETrancactionType } from '../enums/transaction-type.enum';

export class CreateTransactionRecordDto {
  @IsNotEmpty()
  @IsString()
  amount: number;

  @IsNotEmpty()
  @IsEnum(ETrancactionType)
  type: ETrancactionType;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  categoryId: string;
}
