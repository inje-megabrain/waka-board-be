import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Organization } from '@app/domain/organization.entity';
import { UserProperties } from '@app/domain/user';
import { UserLog } from '@app/domain/user-log.entity';

@Entity('users')
export class User implements UserProperties {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ unique: true })
  apiKey: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ type: 'int', nullable: true })
  organizationId: number | null;

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;

  @OneToMany(() => UserLog, (userLog) => userLog.user)
  userLogs: UserLog[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
