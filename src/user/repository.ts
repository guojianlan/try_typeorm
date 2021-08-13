import { WrapAbstractTypeOrmRepository } from 'src/abstract.typeorm.repository';
import { EntityRepository, Equal } from 'typeorm';
import { UserEntity } from './entity';

@EntityRepository(UserEntity)
export class UserRepository extends WrapAbstractTypeOrmRepository<UserEntity>({
  baseFind: {
    where: {
      dtime: Equal(0),
    },
  },
}) {
  async getByName(name: string) {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }
}
