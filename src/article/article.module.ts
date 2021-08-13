import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity, ArticleRepository } from '.';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleRepository])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
