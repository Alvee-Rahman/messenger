import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthEntity } from './auth/entities/auth.entity';
import { AuthController } from './auth/auth.controller';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConversationModule } from './conversation/conversation.module';
import { Conversation } from './conversation/entities/conversation.entity';
import {ConversationsGateway} from './conversation/conversation.gateway'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      entities: [AuthEntity,Conversation], 
    }), 
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '15h' },
    }),
    AuthModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService , ConversationsGateway],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
     consumer
     .apply(LoggingMiddleware)
     .forRoutes(AuthController,)

  }
}