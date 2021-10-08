import { Body, Controller, Get, UseGuards, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from "./users.model";
import { JwtAuthGuards } from 'src/auth/jwt-auth.guards';
import { Role } from 'src/auth/roles-auth.decorator';
import { RoleGuards } from 'src/auth/roles-guards';
import { AddRoleDto } from './dto/add-role.dto';

@ApiTags("Users")
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: "Get all users"})
    @ApiResponse({status: 200, type: User})
    @Role("user")
    @UseGuards(RoleGuards)
    @UseGuards(JwtAuthGuards)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: "Add role to user"})
    @ApiResponse({status: 200})
    // @Role("admin")
    @UseGuards(RoleGuards)
    @UseGuards(JwtAuthGuards)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    // @ApiOperation({summary: "Add organization to user"})
    // @ApiResponse({status: 200, type: User})
    // addOrganizationToUser(@Body()) {

    // }
}
