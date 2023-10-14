import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthenticateDTO {
  @IsEmail(undefined, { message: ' invalid paramater' })
  email: string;
  @IsNotEmpty({ message: ' password should be not empty' })
  password: string;
}
