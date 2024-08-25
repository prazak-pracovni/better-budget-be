import { Module } from '@nestjs/common';
import { TransactionRecordsService } from './transaction-records.service';
import { TransactionRecordsController } from './transaction-records.controller';
import { TransactionRecord } from './entities/transaction-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TransactionRecordsController],
  imports: [TypeOrmModule.forFeature([TransactionRecord])],
  providers: [TransactionRecordsService],
})
export class TransactionRecordsModule {}
