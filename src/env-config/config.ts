import { IsNumber } from 'class-validator';

export class EnvConfig {
  @IsNumber()
  PORT: number;
}
