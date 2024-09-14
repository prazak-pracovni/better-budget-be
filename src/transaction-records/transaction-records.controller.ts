import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionRecordsService } from './transaction-records.service';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransactionRecord } from './entities/transaction-record.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Transaction records')
@Controller('transaction-records')
export class TransactionRecordsController {
  constructor(private readonly _transactionRecordsService: TransactionRecordsService) {}

  @Post()
  async create(@Body() createTransactionRecordDto: CreateTransactionRecordDto): Promise<TransactionRecord> {
    return this._transactionRecordsService.create(createTransactionRecordDto);
  }

  @Get()
  async findAll(): Promise<TransactionRecord[]> {
    return this._transactionRecordsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TransactionRecord> {
    return this._transactionRecordsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionRecordDto: UpdateTransactionRecordDto,
  ): Promise<UpdateResult> {
    return this._transactionRecordsService.update(+id, updateTransactionRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this._transactionRecordsService.remove(+id);
  }
}
