import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  OrganizationProperties,
  OrganizationType,
} from '@app/domain/organization';
import { User } from '@app/domain/user.entity';

@Entity('organizations')
export class Organization implements OrganizationProperties {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ enum: OrganizationType })
  title: OrganizationType;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
