import { Body, Controller,  Get, Param, Post, Req } from '@nestjs/common';
import { ConversationsService } from '../conversation/conversation.service';
import { CreateConversationDto } from './dto/createconversation.dto';
import { userInfo } from 'os';


@Controller('conversation')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get('user')
  async getConversation(@Req() request: Request) {
    
    const conversation = await this.conversationsService.findOne({userName:CreateConversationDto})  

  }

  @Post('create')
  
  createConversation(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationsService.createConversation(createConversationDto);
  }
}
