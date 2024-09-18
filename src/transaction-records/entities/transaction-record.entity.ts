import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ETrancactionType } from '../enums/transaction-type.enum';

@Entity()
export class TransactionRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  type: ETrancactionType;

  @Column()
  title: string;

  @Column()
  desctiption?: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.transactions, { cascade: true })
  @JoinColumn()
  createdBy: User;

  @Column()
  createdByUserID: string;

  @Column()
  categoryId?: string;
}
