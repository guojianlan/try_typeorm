import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import {
  mergeRepositories,
  WrapAbstractTypeOrmRepositoryMethods,
} from 'src/abstract.typeorm.repository';
import { MoreThan } from 'typeorm';
import { AbstractTypeOrmService } from '../abstract.typeorm.service';
import { UserEntity, UserRepository } from '../user';

@Injectable()
export class UserService extends AbstractTypeOrmService<UserEntity> {
  constructor(private readonly repository: UserRepository) {
    super(repository as any, UserEntity);
  }
  getUsers(): Promise<UserEntity[]> {
    return this.repository.mFind();
  }
  getUsersOne(): Promise<UserEntity> {
    return this.repository.mFindOne(2, {});
  }
  getUsersOneT() {
    return this.repository.findOne(2);
  }
}
