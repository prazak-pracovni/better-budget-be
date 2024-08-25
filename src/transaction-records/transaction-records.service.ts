import { Injectable } from '@nestjs/common';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRecord } from './entities/transaction-record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRecordsService {
  @InjectRepository(TransactionRecord)
  private transactionRecordRepository: Repository<TransactionRecord>;

  create(createTransactionRecordDto: CreateTransactionRecordDto) {
    return this.transactionRecordRepository.save(createTransactionRecordDto);
  }

  findAll() {
    return this.transactionRecordRepository.find();
  }

  findOne(id: string) {
    return this.transactionRecordRepository.findOneBy({ id });
  }

  update(id: number, updateTransactionRecordDto: UpdateTransactionRecordDto) {
    return this.transactionRecordRepository.update(
      id,
      updateTransactionRecordDto,
    );
  }

  remove(id: number) {
    return this.transactionRecordRepository.delete(id);
  }
}
