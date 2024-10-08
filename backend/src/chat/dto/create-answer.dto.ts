import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}
