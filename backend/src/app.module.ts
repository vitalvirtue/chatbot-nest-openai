import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
// import { OpenAiModule } from './openai/openai.module'; // OpenAI modülünü yorum satırına al
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatModule,
    // OpenAiModule // OpenAI modülünü devre dışı bırakıyoruz
  ],
})
export class AppModule {}
