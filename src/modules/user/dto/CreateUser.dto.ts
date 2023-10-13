import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailIsUnique } from '../validator/email-is-unique.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name could not be empty' })
  name: string;

  @IsEmail(undefined, { message: 'Email already exists' })
  @EmailIsUnique({ message: 'Email already exists' })
  email: string;

  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
