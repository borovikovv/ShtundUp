import { Controller, Post, Body, Get, Headers, Put } from '@nestjs/common';
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
    getAllOrganizations() {
        return this.organizationService.getAllOrganizationUsers();
    }

    @ApiOperation({summary: "Send request to join organization"})
    @ApiResponse({status: 200, type: [Organization]})
    @Post("/join")
    joinTolOrganizations(@Body() params: any, @Headers() header: Headers) {
        return this.organizationService.joinToOrganization(params.name, header);
    }

    @ApiOperation({summary: "Set lock or unlock to organization"})
    @ApiResponse({status: 200, type: [Organization]})
    @Put("/lock")
    lockOrganizations(@Body() params: any) {
        return this.organizationService.lockOrganization(params);
    }
}
