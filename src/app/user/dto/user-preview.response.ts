import { ApiProperty } from '@nestjs/swagger';

import { Organization } from '@app/domain/organization.entity';
import { UserPreviewResponseCommand } from '@app/user/user.commands';

export class UserPreviewResponse implements UserPreviewResponseCommand {
  @ApiProperty({ example: 1, description: '사용자 식별자' })
  id: number;

  @ApiProperty({ example: '임채성', description: '사용자 닉네임' })
  nickname: string;

  @ApiProperty({ example: 0, description: '사용자의 총 작업시간' })
  workedTime: number;

  @ApiProperty({ example: 0, description: '사용자의 총 작업시간(초)' })
  organizationTitle: Organization['title'] | null;

  constructor(partial: UserPreviewResponseCommand) {
    Object.assign(this, partial);
  }
}
