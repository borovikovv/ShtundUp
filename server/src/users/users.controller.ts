import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from "./users.model";
import { JwtAuthGuards } from 'src/auth/jwt-auth.guards';

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: "Get all users"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuards)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    // @ApiOperation({summary: "Add organization to user"})
    // @ApiResponse({status: 200, type: User})
    // addOrganizationToUser(@Body()) {

    // }
}
