import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Organization } from '@app/domain/organization.entity';
import { UserLog } from '@app/domain/user-log.entity';
import { User } from '@app/domain/user.entity';
import {
  UserCreateRequestCommand,
  UserListQuery,
  UserPreviewResponseCommand,
  UserProfileResponseCommand,
} from '@app/user/user.commands';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(UserLog)
    private readonly userLogRepository: Repository<UserLog>,
    private readonly httpService: HttpService,
  ) {}

  async getUserProfile(userId: number): Promise<UserProfileResponseCommand> {
    return await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'nickname', 'apiKey'],
    });
  }

  async getUsers(
    userListQuery: UserListQuery,
  ): Promise<UserPreviewResponseCommand[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const users = await this.userRepository.find({
      relations: ['userLogs', 'organization'],
      where: {
        organization: { title: userListQuery.organizationTitle },
        userLogs: {
          createdAt: Between(startDate, new Date()),
        },
      },
    });

    const userWithWorkTime = await Promise.all(
      users.map(async (user) => {
        const workedTime = await Promise.all(
          user.userLogs.map(async (userLog) => {
            return userLog.workedTimeSeconds;
          }),
        ).then((timestamps) =>
          timestamps.reduce(
            (totalWorkTime, timestamp) => totalWorkTime + timestamp,
            0,
          ),
        );

        return { ...user, workedTime };
      }),
    );

    return userWithWorkTime.sort((a, b) => {
      return b.workedTime - a.workedTime;
    });
  }

  async addUser(
    userCreateRequest: UserCreateRequestCommand,
  ): Promise<UserProfileResponseCommand> {
    if (userCreateRequest.organizationTitle) {
      const organization = await this.organizationRepository.findOne({
        where: { title: userCreateRequest.organizationTitle },
      });

      return await this.userRepository.save({
        ...userCreateRequest,
        organization,
      });
    }

    return await this.userRepository.save({
      ...userCreateRequest,
    });
  }

  async fetchAllUserLogs() {
    const users = await this.userRepository.find({
      select: ['apiKey', 'id'],
    });
    users.map(async (user) => this.fetchUserLog(user.id, user.apiKey));
  }

  async fetchUserLog(id: number, apiKey: string) {
    try {
      const { data, status } = await this.httpService.axiosRef.request({
        method: 'GET',
        url: `https://wakatime.com/api/v1/users/current/summaries?range=Today`,
        auth: {
          username: apiKey,
          password: '',
        },
      });

      if (status !== 200) new Error(`${id} user Unauthorized`);

      const workedTimeSeconds: number = data.cumulative_total.seconds;

      const user = await this.userRepository.findOne({ where: { id } });
      await this.userLogRepository.save({
        ...user,
        workedTimeSeconds,
        userId: user.id,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
