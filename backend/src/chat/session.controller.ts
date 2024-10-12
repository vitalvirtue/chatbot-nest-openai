import { Controller, Get, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('create')
  async createSession(@Body('userId') userId: string) {
    return this.sessionService.createSession(userId);
  }

  @Post(':sessionId/message')
  async addMessage(
    @Param('sessionId') sessionId: string,
    @Body('type') type: string,
    @Body('text') text: string,
  ) {
    // Gelen verilerin eksiksiz ve doğru olduğundan emin ol
    if (!type || !text) {
      throw new BadRequestException('Type and text are required');
    }
    return this.sessionService.addMessage(sessionId, type, text);
  }

  @Get('user/:userId')
  async getUserSessions(@Param('userId') userId: string) {
    return this.sessionService.getUserSessions(userId);
  }

  @Get(':sessionId')
  async getSessionById(@Param('sessionId') sessionId: string) {
    return this.sessionService.getSessionById(sessionId);
  }
}
