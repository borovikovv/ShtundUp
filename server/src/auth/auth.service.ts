import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
        private jwtService: JwtService){}

    async registration(userDto: CreateUserDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);

        if(candidate) {
            throw new HttpException("User already exist", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await hash(userDto.password, 12);
        const user = await this.usersService.createUser({...userDto, password: hashPassword})

        return this.generateToken(user);
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, role: user.role}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        const validatePassword = await compare(userDto.password, user.password);

        if(validatePassword && user) {
            return user;
        }

        throw new UnauthorizedException({message: "Email or password not correct, please try again."})
    };
}
