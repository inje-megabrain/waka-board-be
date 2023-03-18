import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { OrganizationType } from '@app/domain/organization';
import {
  OrderEnum,
  OrderTypeEnum,
} from '@app/infrastructure/types/order.types';
import { UserCreateRequest } from '@app/user/dto/user-create.request';
import { UserPreviewResponse } from '@app/user/dto/user-preview.response';
import { UserProfileResponse } from '@app/user/dto/user-profile.response';
import { UserService } from '@app/user/user.service';

@ApiTags('회원')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiParam({
    name: 'userId',
    example: 1,
    description: '회원 ID',
  })
  @Get(':userId')
  async getUser(@Param('userId') userId: number): Promise<UserProfileResponse> {
    const user = await this.userService.getUserProfile(userId);
    return new UserProfileResponse(user);
  }

  @ApiQuery({
    name: 'date',
    example: 7,
    description: '최근 7일간 코딩 시간을 가져옵니다.',
  })
  @ApiQuery({
    name: 'order',
    example: 'WORK_TIME',
    description: '정렬 기준을 설정합니다.',
    enum: OrderEnum,
  })
  @ApiQuery({
    name: 'order_type',
    example: 'ASC',
    description: '정렬 방식을 설정합니다.',
    enum: OrderTypeEnum,
  })
  @ApiQuery({
    name: 'organization',
    description: '특정 조직만 조회합니다.',
    required: false,
    enum: OrganizationType,
  })
  @Get()
  async getUsers(
    @Query('date', new DefaultValuePipe(7), ParseIntPipe) date: number,
    @Query(
      'order',
      new DefaultValuePipe(OrderEnum.WORK_TIME.toString()),
      new ParseEnumPipe(OrderEnum),
    )
    order: OrderEnum,
    @Query(
      'order_type',
      new ParseEnumPipe(OrderTypeEnum),
      new DefaultValuePipe(OrderTypeEnum.ASC.toString()),
    )
    order_type: OrderTypeEnum,
    @Query('organization')
    organization?: OrganizationType,
  ) {
    const users = await this.userService.getUsers({
      date,
      order,
      orderType: order_type,
      organizationTitle: organization,
    });
    return users.map((user) => new UserPreviewResponse(user));
  }

  @Post()
  async addUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<UserProfileResponse> {
    const user = await this.userService.addUser(userCreateRequest);
    return new UserProfileResponse(user);
  }

  @Post('logs')
  async fetchAllUserLogs() {
    await this.userService.fetchAllUserLogs();
  }

  //TODO: GET 개인 세부 정보 조회
  @Get(':userId')
  async getUserDetail(@Param('userId') userId: number) {}
}
