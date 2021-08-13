import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { AbstractTypeOrmService } from '../abstract.typeorm.service';
import { ArticleEntity, ArticleRepository } from '../article';

@Injectable()
export class ArticleService extends AbstractTypeOrmService<ArticleEntity> {
  constructor(private readonly repository: ArticleRepository) {
    super(repository as any, ArticleEntity);
  }
  public async findOne(id: number): Promise<ArticleEntity> | never {
    return await this.queryBuilder()
      .andWhere('id=:id', { id })
      .select(['model.name', 'model.id'])
      .limit(1)
      .getOneOrFail();
  }
  getArticle(): Promise<ArticleEntity[]> {
    return this.repository.find();
  }
}
