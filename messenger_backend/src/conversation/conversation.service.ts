import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/createconversation.dto';

@Injectable()
export class ConversationsService {
  
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
  ) {}

  async findOne(condition: any): Promise<Conversation> {
    return this.conversationRepository.findOne(condition);
}
  async createConversation(createConversationDto: CreateConversationDto): Promise<Conversation> {
    const conversation = this.conversationRepository.create(createConversationDto);
    return this.conversationRepository.save(conversation);
  }
}
