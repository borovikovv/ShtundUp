import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './organizations.model';
import { OrganizationsService } from './organizations.service';

@ApiTags("Organizations")
@Controller("organizations")
export class OrganizationsController {
    constructor(private organizationService: OrganizationsService){}

    @ApiOperation({summary: "Create new organization"})
    @ApiResponse({status: 200, type: Organization})
    @Post("/create")
    create(@Headers() headers: Headers, @Body() dto: CreateOrganizationDto) {
        return this.organizationService.createOrganization(dto, headers);
    }

    @ApiOperation({summary: "Get all users in current organization"})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAllUsers() {
        return this.organizationService.getAllOrganizationUsers();
    }
}
