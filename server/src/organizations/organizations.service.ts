import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { Organization } from './organizations.model';

@Injectable()
export class OrganizationsService {

    constructor(@InjectModel(Organization) private organizationRepository: typeof Organization,
        @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
        @Inject(forwardRef(() => AuthService)) private authService: AuthService){}

    async createOrganization(dto: CreateOrganizationDto, headers: any) {
        const hasOrganization = await this.organizationRepository.findOne({where: {name: dto.name}});
        if(hasOrganization) {
            throw new HttpException("Organization name already exist, try another name.", HttpStatus.BAD_REQUEST)
        }

        const organization = await this.organizationRepository.create(dto);
        // const user = await this.usersService.appointOrganizationOwner(organization.id, headers.authorization)

        return organization;
    }

    async deleteOrganization() {
        
    }

    async getAllOrganizationUsers() {
        const users = await this.organizationRepository.findAll({attributes: ["users"]});

        return users;
    }

}
