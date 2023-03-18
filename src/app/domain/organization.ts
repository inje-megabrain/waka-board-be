import { User } from '@app/domain/user.entity';

export interface OrganizationProperties {
  id: number;
  title?: OrganizationType;
  description?: string;
  users?: User[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export enum OrganizationType {
  MEGA_BRAIN = 'MEGA_BRAIN',
  DOTGABI = 'DOTGABI',
  PNN = 'PNN',
}
