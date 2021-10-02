import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({summary: "Create new user"})
    @ApiResponse({status: 200, type: User})
    @Post("/signup")
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({summary: "Login user"})
    @ApiResponse({status: 200, type: User})
    @Post("/login")
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }
}
