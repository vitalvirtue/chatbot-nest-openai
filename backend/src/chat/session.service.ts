import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './schemas/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  // Yeni oturum başlat
  async createSession(userId: string): Promise<Session> {
    const newSession = new this.sessionModel({ userId, messages: [] });
    return newSession.save();
  }

  // Oturuma mesaj ekle
  async addMessage(
    sessionId: string,
    type: string,
    text: string,
  ): Promise<Session> {
    return this.sessionModel.findByIdAndUpdate(
      sessionId,
      { $push: { messages: { type, text } }, $set: { updatedAt: new Date() } },
      { new: true },
    );
  }

  // Kullanıcının oturumlarını getir
  async getUserSessions(userId: string): Promise<Session[]> {
    return this.sessionModel.find({ userId }).exec();
  }

  // Tek bir oturumu getir
  async getSessionById(sessionId: string): Promise<Session> {
    return this.sessionModel.findById(sessionId).exec();
  }
}
