import { Module } from '@nestjs/common';

import { TaskService } from '@app/task/task.service';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule],
  providers: [TaskService],
})
export class TaskModule {}
