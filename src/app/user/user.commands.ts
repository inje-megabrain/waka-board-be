import {
  OrganizationProperties,
  OrganizationType,
} from '@app/domain/organization';
import { UserProperties } from '@app/domain/user';
import {
  OrderEnum,
  OrderTypeEnum,
} from '@app/infrastructure/types/order.types';

type DateInfo = { date: number };
type OrderTypeInfo = { orderType: OrderTypeEnum };
type OrderInfo = { order: OrderEnum };
type OrganizationInfo = { organizationTitle?: OrganizationType };
type WorkedTimeInfo = { workedTime: number };

export type UserListQuery = OrderTypeInfo &
  OrderInfo &
  DateInfo &
  OrganizationInfo;

export type UserProfileResponseCommand = Pick<
  UserProperties,
  'id' | 'nickname' | 'apiKey'
>;

export type UserCreateRequestCommand = Pick<
  UserProperties,
  'nickname' | 'apiKey'
> &
  OrganizationInfo;

export type UserPreviewResponseCommand = Pick<
  UserProperties,
  'id' | 'nickname'
> &
  Pick<OrganizationProperties, 'title'> &
  WorkedTimeInfo;
