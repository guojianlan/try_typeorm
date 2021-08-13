import { WrapAbstractTypeOrmRepository } from 'src/abstract.typeorm.repository';
import { EntityRepository, Equal } from 'typeorm';
import { ArticleEntity } from './entity';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends WrapAbstractTypeOrmRepository<ArticleEntity>(
  {
    baseFind: {
      where: {
        dtime: Equal(0),
      },
    },
  },
) {}
