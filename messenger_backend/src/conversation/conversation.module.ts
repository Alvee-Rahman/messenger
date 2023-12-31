import { Module } from '@nestjs/common';
import { ConversationsController } from './conversation.controller';
import { ConversationsService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { ConversationsGateway } from '../conversation/conversation.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation])],
  controllers: [ConversationsController],
  providers: [ConversationsService, ConversationsGateway]
})
export class ConversationModule {}
