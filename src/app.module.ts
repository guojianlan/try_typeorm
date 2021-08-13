import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user';
import { ArticleEntity } from './article';
import { APP_PIPE } from '@nestjs/core';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: +'3306',
      username: 'root',
      database: 'test-tt',
      password: '123456',
      logging: true,
      entities: [UserEntity, ArticleEntity],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
