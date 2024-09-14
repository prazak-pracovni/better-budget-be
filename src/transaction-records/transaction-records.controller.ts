import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionRecordsService } from './transaction-records.service';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction records')
@Controller('transaction-records')
export class TransactionRecordsController {
  constructor(private readonly _transactionRecordsService: TransactionRecordsService) {}

  @Post()
  create(@Body() createTransactionRecordDto: CreateTransactionRecordDto) {
    return this._transactionRecordsService.create(createTransactionRecordDto);
  }

  @Get()
  findAll() {
    return this._transactionRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._transactionRecordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionRecordDto: UpdateTransactionRecordDto) {
    return this._transactionRecordsService.update(+id, updateTransactionRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._transactionRecordsService.remove(+id);
  }
}
