import { IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  userImage: string;

  @IsString()
  userName: string;

  @IsString()
  activeStatus
}