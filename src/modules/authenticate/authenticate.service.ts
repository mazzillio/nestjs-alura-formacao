import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
export type UserPayload = {
  sub: string;
  userName: string;
};
@Injectable()
export class AuthenticateService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login({ email, password }: AuthenticateDTO) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email/password');
    }
    const authenticateUser = await compare(password, user.password);
    if (!authenticateUser) {
      throw new UnauthorizedException('Invalid email/password');
    }
    const payload: UserPayload = {
      sub: user.id,
      userName: user.name,
    };
    return {
      token_access: await this.jwtService.signAsync(payload),
    };
  }
}
