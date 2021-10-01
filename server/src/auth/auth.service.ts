import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

import { LoginUserDto } from "./dto/login-user.dto";
// import { RegisterUserDto } from "./dto/register-user.dto";
// import { User } from "./dto/user.interface";

@Injectable()
export class AuthService {

  constructor(private userService: UsersService) {}

  async validateUser(user: LoginUserDto) {
    const foundUser = await this.userService.getUserByEmail(user.email);
    if (!foundUser || !(await compare(user.password, foundUser.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return foundUser;
  }

  findById(id: number) {
    
  }

  // async registerUser(user: RegisterUserDto): Promise<Omit<User, 'password'>> {
  //   const existingUser = await this.userRepository.create({user.email, user.password});
  //   if (existingUser) {
  //     throw new BadRequestException('User remail must be unique');
  //   }
    

  // }
}