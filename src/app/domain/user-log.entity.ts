import { Column, CreateDateColumn, Entity, ManyToOne } from 'typeorm';

import { User } from '@app/domain/user.entity';

@Entity('user_logs')
export class UserLog {
  @Column({ type: 'int', primary: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.userLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;

  @Column({ type: 'numeric' })
  workedTimeSeconds: number;

  @CreateDateColumn({ type: 'date', primary: true })
  createdAt: Date;
}
