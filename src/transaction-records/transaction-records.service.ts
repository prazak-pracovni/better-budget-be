import { Injectable } from '@nestjs/common';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRecord } from './entities/transaction-record.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { TransactionRecordFilterDto } from './dto/transaction-record-filter.dto';
import { TransactionRecordsDto } from './dto/transaction-records.dto';
import { BalanceDto } from 'src/transaction-records/dto/balance.dto';
import { ETrancactionType } from 'src/transaction-records/enums/transaction-type.enum';

@Injectable()
export class TransactionRecordsService {
  @InjectRepository(TransactionRecord)
  private _transactionRecordRepository: Repository<TransactionRecord>;

  async create(createTransactionRecordDto: CreateTransactionRecordDto, user: User): Promise<TransactionRecord> {
    const transactionRecord = new TransactionRecord();
    const date = new Date(createTransactionRecordDto.date);

    Object.assign(transactionRecord, { ...createTransactionRecordDto, createdBy: user, date });

    return this._transactionRecordRepository.save(transactionRecord);
  }

  async findAllUserTransactions(
    user: User,
    order: 'ASC' | 'DESC',
    filter: TransactionRecordFilterDto,
  ): Promise<TransactionRecordsDto> {
    const { page = 1, limit, startDate, endDate } = filter;

    const queryBuilder = this._transactionRecordRepository
      .createQueryBuilder('transactionRecord')
      .where('transactionRecord.createdBy = :userId', { userId: user.id })
      .orderBy('transactionRecord.date', order);

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    if (startDate) {
      queryBuilder.andWhere('transactionRecord.date >= :startDate', { startDate });
    }

    if (endDate) {
      queryBuilder.andWhere('transactionRecord.date <= :endDate', { endDate });
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      transactions: data,
      total,
      page,
    };
  }

  async calculateUserBalance(user: User, date?: Date): Promise<BalanceDto> {
    const { balanceOnDate, totalBalance } = await this._transactionRecordRepository
      .createQueryBuilder('tr')
      .where('tr.createdBy = :userId', { userId: user.id })
      .select([
        `SUM(
          CASE tr.type
            WHEN '${ETrancactionType.INCOME}' THEN tr.amount
            ELSE -tr.amount
          END
        ) FILTER (WHERE tr.date <= :date) as "balanceOnDate"`,
        `SUM(
          CASE tr.type
            WHEN '${ETrancactionType.INCOME}' THEN tr.amount
            ELSE -tr.amount
          END
        ) as "totalBalance"`,
      ])
      .setParameter('date', date ?? new Date())
      .getRawOne();

    console.log('Balance on date', balanceOnDate);

    return {
      balanceOnDate: Number(balanceOnDate),
      totalBalance: Number(totalBalance),
    };
  }

  async findOne(id: string): Promise<TransactionRecord> {
    return this._transactionRecordRepository.findOneBy({ id });
  }

  async update(id: string, updateTransactionRecordDto: UpdateTransactionRecordDto): Promise<UpdateResult> {
    return this._transactionRecordRepository.update(id, updateTransactionRecordDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this._transactionRecordRepository.delete(id);
  }
}
