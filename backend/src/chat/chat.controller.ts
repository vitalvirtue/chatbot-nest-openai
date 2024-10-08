import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('questions')
  async getQuestions() {
    return this.chatService.getQuestions();
  }

  @Post(':userId/answer')
  async saveAnswer(
    @Param('userId') userId: string,
    @Body() createAnswerDto: CreateAnswerDto,
  ) {
    return this.chatService.createAnswer(
      userId,
      createAnswerDto.question,
      createAnswerDto.answer,
    );
  }

  @Post(':userId/start')
  async startSession(@Param('userId') userId: string) {
    return this.chatService.startSession(userId);
  }

  @Post(':userId/end')
  async endSession(@Param('userId') userId: string) {
    return this.chatService.endSession(userId);
  }
}
