
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LocalGuard } from "../local.guard";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto"

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // @ApiOperation({ summary: "Create new user" })
    // @ApiResponse({ status: 200, type: RegisterUserDto })
    // @Post('register')
    // registerUser(@Body() user: RegisterUserDto) {
    //     return this.authService.registerUser(user);
    // }

    @ApiOperation({ summary: "Login" })
    @ApiResponse({ status: 200, type: LoginUserDto })
    @UseGuards(LocalGuard)
    @Post('login')
    loginUser(@Req() req, @Body() user: LoginUserDto) {
        return req.session;
    }
}