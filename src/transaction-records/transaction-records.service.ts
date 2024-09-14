import { Injectable } from '@nestjs/common';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRecord } from './entities/transaction-record.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TransactionRecordsService {
  @InjectRepository(TransactionRecord)
  private _transactionRecordRepository: Repository<TransactionRecord>;

  async create(createTransactionRecordDto: CreateTransactionRecordDto): Promise<TransactionRecord> {
    return this._transactionRecordRepository.save(createTransactionRecordDto);
  }

  async findAll(): Promise<TransactionRecord[]> {
    return this._transactionRecordRepository.find();
  }

  async findOne(id: string): Promise<TransactionRecord> {
    return this._transactionRecordRepository.findOneBy({ id });
  }

  async update(id: number, updateTransactionRecordDto: UpdateTransactionRecordDto): Promise<UpdateResult> {
    return this._transactionRecordRepository.update(id, updateTransactionRecordDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this._transactionRecordRepository.delete(id);
  }
}
