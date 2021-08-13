import { Body, Controller, Get, Post } from '@nestjs/common';
import { WrapController } from '../abstract/typeorm.controller';

import { ArticleEntity } from '../article';
import { ArticleService } from './article.service';

const CrudController = WrapController<ArticleEntity>({
  model: ArticleEntity,
});

@Controller('article')
export class ArticleController extends CrudController {
  constructor(private readonly service: ArticleService) {
    super(service);
  }
  // @Get()
  // public Article() {
  //   console.log(12313);
  //   return this.service.getArticle();
  // }
  // @Post()
  // public async create(@Body() body: UserEntity) {
  //   return 'create'
  // }
}
