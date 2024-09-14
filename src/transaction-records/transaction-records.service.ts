import { Injectable } from '@nestjs/common';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRecord } from './entities/transaction-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRecordsService {
  @InjectRepository(TransactionRecord)
  private _transactionRecordRepository: Repository<TransactionRecord>;

  create(createTransactionRecordDto: CreateTransactionRecordDto) {
    return this._transactionRecordRepository.save(createTransactionRecordDto);
  }

  findAll() {
    return this._transactionRecordRepository.find();
  }

  findOne(id: string) {
    return this._transactionRecordRepository.findOneBy({ id });
  }

  update(id: number, updateTransactionRecordDto: UpdateTransactionRecordDto) {
    return this._transactionRecordRepository.update(id, updateTransactionRecordDto);
  }

  remove(id: number) {
    return this._transactionRecordRepository.delete(id);
  }
}
