import {
  Module, NestModule, MiddlewareConsumer, RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import AuthMiddleware from './middlewares/auth.middleware';
import { CardModule } from './card/card.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/mestodb'), UserModule, CardModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({ path: 'users/signin', method: RequestMethod.POST }, { path: '/users', method: RequestMethod.POST })
      .forRoutes('users', 'cards');
  }
}

export default {};
