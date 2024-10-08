import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateQuestion(): Promise<string> {
    const response = await this.openai.completions.create({
      model: 'text-davinci-003',
      prompt: 'Generate a question about cats.',
      max_tokens: 50,
    });
    return response.choices[0].text.trim();
  }
}
