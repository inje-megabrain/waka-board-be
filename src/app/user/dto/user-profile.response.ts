import { ApiProperty } from '@nestjs/swagger';

import { UserProfileResponseCommand } from '@app/user/user.commands';

export class UserProfileResponse implements UserProfileResponseCommand {
  @ApiProperty({
    description: '사용자 ID',
    example: 1,
  })
  id: number;

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

  constructor(user: UserProfileResponseCommand) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.apiKey = user.apiKey;
  }
}
