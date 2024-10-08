import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>,
    // private openAiService: OpenAiService, // OpenAI servisini devre dışı bırak
  ) {}

  async createAnswer(
    userId: string,
    question: string,
    answer: string,
  ): Promise<Chat> {
    const newChat = new this.chatModel({ userId, question, answer });
    return newChat.save();
  }

  async startSession(userId: string): Promise<User> {
    const newUser = new this.userModel({ userId, sessionStart: new Date() });
    return newUser.save();
  }

  async endSession(userId: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { userId },
      { sessionEnd: new Date() },
      { new: true },
    );
  }

  async getChatHistory(userId: string): Promise<Chat[]> {
    return this.chatModel.find({ userId }).exec();
  }

  async getQuestions(): Promise<string[]> {
    return [
      'What is your favorite breed of cat, and why?',
      'How do you think cats communicate with their owners?',
      'Have you ever owned a cat? If so, what was their name and personality like?',
      'Why do you think cats love to sleep in small, cozy places?',
      'What’s the funniest or strangest behavior you’ve ever seen a cat do?',
      'Do you prefer cats or kittens, and what’s the reason for your preference?',
      'Why do you think cats are known for being independent animals?',
      'How do you think cats manage to land on their feet when they fall?',
      'What’s your favorite fact or myth about cats?',
      'How would you describe the relationship between humans and cats in three words?',
    ];
  }

  /*
  async generateQuestion(): Promise<string> {
    return await this.openAiService.generateQuestion();
  }
  */
}
