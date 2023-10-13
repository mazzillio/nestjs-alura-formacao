import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserControler } from './user.controller';
import { EmailIsUniqueValidator } from './validator/email-is-unique.validator';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControler],
  providers: [UserService, EmailIsUniqueValidator],
})
export class UserModule {}
