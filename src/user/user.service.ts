import { Injectable } from '@nestjs/common';
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

    user.email = userData.email;
    user.password = userData.password;
    user.name = userData.name;
    console.log('User');

    return this.userRepository.save(user);
  }

  async listUsers() {
    const users = await this.userRepository.find();
    const usersList = users.map((user) => new ListUsersDTO(user.id, user.name));
    return usersList;
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    });
    console.log('check email');
    return checkEmail;
  }

  async updateUser(id: string, newData: UpdateUserDTO) {
    await this.userRepository.update(id, newData);
  }

  async deletUser(id: string) {
    await this.userRepository.delete(id);
  }
}
