import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { UserService } from '@app/user/user.service';

@Injectable()
export class TaskService {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(TaskService.name);

  @Cron('* 20 * * *')
  handleCron() {
    this.userService.fetchAllUserLogs().then();
    this.logger.debug('20분마다 실행됩니다.');
  }
}
