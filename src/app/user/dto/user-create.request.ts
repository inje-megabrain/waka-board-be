import { ApiProperty } from '@nestjs/swagger';

import { OrganizationType } from '@app/domain/organization';
import { UserCreateRequestCommand } from '@app/user/user.commands';

export class UserCreateRequest implements UserCreateRequestCommand {
  @ApiProperty({
    description: '사용자 닉네임',
    example: '임채성',
  })
  nickname: string;

  @ApiProperty({
    description: 'WAKATIME API KEY',
    example: 'waka_ccc0d9ec-b100-4ed7-a11d-85be39d703bf',
  })
  apiKey: string;

  @ApiProperty({
    description: '소속 조직',
    example: OrganizationType.MEGA_BRAIN,
  })
  organizationTitle?: OrganizationType;
}
