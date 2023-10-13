import { Injectable, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHash implements PipeTransform {
  constructor(private configService: ConfigService) {}
  async transform(password: string) {
    const sal = this.configService.get<string>('PASSWORD_SAL') as string;
    return await bcrypt.hash(password, sal);
  }
}
