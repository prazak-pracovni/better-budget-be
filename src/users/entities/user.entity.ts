import { Category } from 'src/categories/entities/category.entity';
import { TransactionRecord } from 'src/transaction-records/entities/transaction-record.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Category, (category) => category.createdBy)
  categories: Category[];

  @OneToMany(() => TransactionRecord, (transaction) => transaction.createdBy)
  transactions: TransactionRecord[];
}
