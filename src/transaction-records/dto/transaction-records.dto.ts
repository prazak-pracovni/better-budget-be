import { TransactionRecord } from '../entities/transaction-record.entity';

export class TransactionRecordsDto {
  transactions: TransactionRecord[];
  total: number;
  page: number;
}
