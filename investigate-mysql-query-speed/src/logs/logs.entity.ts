import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('logs')
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: number;

  @Column()
  ticketId: number;

  @Column({ length: 255 })
  title: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ nullable: true })
  correlationId: string;
}
