import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateDTO } from './dto/authenticate.dto';

@Controller('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post()
  login(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authenticateService.login(authenticateDTO);
  }
}
