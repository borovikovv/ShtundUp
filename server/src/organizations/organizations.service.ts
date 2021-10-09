import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { Organization } from './organizations.model';

@Injectable()
export class OrganizationsService {

    constructor(@InjectModel(Organization) private organizationRepository: typeof Organization, 
    private userService: UsersService){}

    async createOrganization(dto: CreateOrganizationDto) {
        const hasOrganization = await this.organizationRepository.findOne({where: {name: dto.name}});
        if(hasOrganization) {
            throw new HttpException("Organization name already exist, try another name.", HttpStatus.BAD_REQUEST)
        }

        const organization = await this.organizationRepository.create(dto);

        return organization;
    }

    async getAllOrganizationUsers() {
        const users = await this.organizationRepository.findAll({attributes: ["users"]});

        return users;
    }

}
