import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { IRequestUser } from '../../modules/authenticate/authenticate.guard';

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp();
    const request = contextHttp.getRequest<Request | IRequestUser>();
    const response = contextHttp.getResponse<Response>();
    const { path, method } = request;
    const { statusCode } = response;
    const instant = Date.now();
    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Access route by ${request.user.sub}`);
        }
        const executionTime = Date.now() - instant;
        this.logger.log(
          `${method} ${path} status ${statusCode} - ${executionTime}ms`,
        );
      }),
    );
  }
}
