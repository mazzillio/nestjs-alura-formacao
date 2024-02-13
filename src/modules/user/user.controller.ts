import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/Updateuser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { ListUsersDTO } from './dto/ListUsers';
import { UserService } from './user.service';
import { PasswordHash } from '../../resources/pipes/password-hash.pipe';
interface IOutputUser {
  user: ListUsersDTO;
  message: string;
}
@Controller('/users')
export class UserControler {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body() userData: CreateUserDTO,
    @Body('password', PasswordHash) passwordHash: string,
  ): Promise<IOutputUser> {
    const createdUser = await this.userService.createUser({
      ...userData,
      password: passwordHash,
    });
    return {
      user: new ListUsersDTO(createdUser.id, createdUser.name),
      message: 'created user',
    };
  }

  @Get()
  async listUsers(): Promise<ListUsersDTO[]> {
    return await this.userService.listUsers();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updatedUser = await this.userService.updateUser(id, newData);

    return {
      usuario: updatedUser,
      messagem: 'uptaed user',
    };
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userService.deletUser(id);

    return {
      usuario: removedUser,
      messagem: 'removed user',
    };
  }
}
