import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUsersDTO } from './dto/ListUsers';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/Updateuser.dto';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, <User>userData);

    return this.userRepository.save(user);
  }

  async listUsers(): Promise<ListUsersDTO[]> {
    const users = await this.userRepository.find();
    const usersList = users.map((user) => new ListUsersDTO(user.id, user.name));
    return usersList;
  }

  async findByEmail(email: string): Promise<User> {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    return <User>checkEmail;
  }

  async updateUser(id: string, newData: UpdateUserDTO): Promise<void> {
    await this.userRepository.update(id, <User>newData);
  }

  async deletUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
