import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionRecordsService } from './transaction-records.service';
import { CreateTransactionRecordDto } from './dto/create-transaction-record.dto';
import { UpdateTransactionRecordDto } from './dto/update-transaction-record.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction records')
@Controller('transaction-records')
export class TransactionRecordsController {
  constructor(private readonly transactionRecordsService: TransactionRecordsService) {}

  @Post()
  create(@Body() createTransactionRecordDto: CreateTransactionRecordDto) {
    return this.transactionRecordsService.create(createTransactionRecordDto);
  }

  @Get()
  findAll() {
    return this.transactionRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionRecordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionRecordDto: UpdateTransactionRecordDto) {
    return this.transactionRecordsService.update(+id, updateTransactionRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionRecordsService.remove(+id);
  }
}
