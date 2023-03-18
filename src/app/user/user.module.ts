import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Organization } from '@app/domain/organization.entity';
import { UserLog } from '@app/domain/user-log.entity';
import { User } from '@app/domain/user.entity';
import { UserController } from '@app/user/user.controller';
import { UserService } from '@app/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Organization, UserLog]),
    HttpModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
