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

@Controller('/users')
export class UserControler {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const createdUser = await this.userService.createUser(userData);

    return {
      usuario: new ListUsersDTO(createdUser.id, createdUser.name),
      messagem: 'created user',
    };
  }

  @Get()
  async listUsers(): Promise<ListUsersDTO[]> {
    const users = await this.userService.listUsers();

    return users;
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
