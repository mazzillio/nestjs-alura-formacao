import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from './authenticate.service';
export interface IRequestUser extends Request {
  user: UserPayload;
}
@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private extractToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<IRequestUser>();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('Authenticate failed');
    }
    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Aunthenticate failed');
    }
    return true;
  }
}
