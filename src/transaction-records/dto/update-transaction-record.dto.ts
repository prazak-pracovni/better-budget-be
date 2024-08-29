import { PartialType } from '@nestjs/swagger';
import { CreateTransactionRecordDto } from './create-transaction-record.dto';

export class UpdateTransactionRecordDto extends PartialType(CreateTransactionRecordDto) {}
