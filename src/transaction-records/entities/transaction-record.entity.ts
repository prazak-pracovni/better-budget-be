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

  @Column({
    nullable: true,
  })
  description: string | null;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => User, (user) => user.transactions, { cascade: true })
  @JoinColumn({ name: 'createdByUserID' })
  createdBy: User;

  @Column({
    nullable: true,
  })
  categoryId: string | null;
}
