import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { ChatSchema, Chat } from './chat/schemas/chat.schema';
import { UserSchema, User } from './chat/schemas/user.schema';
import { SessionController } from './chat/session.controller';
import { SessionService } from './chat/session.service';
import { SessionSchema, Session } from './chat/schemas/session.schema';
// import { OpenAiModule } from './openai/openai.module'; // OpenAI modülünü yorum satırına al
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatModule,
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]), // Chat modeli tanımlandı
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // User modeli tanımlandı
    // OpenAiModule // OpenAI modülünü devre dışı bırakıyoruz
  ],
  controllers: [SessionController], // SessionController burada dahil edilmeli
  providers: [SessionService],
})
export class AppModule {}
