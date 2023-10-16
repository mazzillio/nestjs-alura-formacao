import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  ConsoleLogger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
@Catch()
export class ExceptionFilterGlobal implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private logger: ConsoleLogger,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);
    console.error(exception);
    const { httpAdapter } = this.adapterHost;
    const contex = host.switchToHttp();
    const request = contex.getRequest();
    const response = contex.getResponse();
    if ('user' in request) {
      this.logger.log(`Access route by ${request.user.sub}`);
    }
    const { status, body } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            body: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(request),
            },
          };
    httpAdapter.reply(response, body, status);
  }
}
