import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { Organization } from './organizations.model';

@Injectable()
export class OrganizationsService {

    constructor(@InjectModel(Organization) private organizationRepository: typeof Organization){}

    async createOrganization(dto: CreateOrganizationDto) {
        const organization = await this.organizationRepository.create(dto);

        return organization;
    }

    async getAllOrganizationUsers() {
        const users = await this.organizationRepository.findAll({attributes: ["users"]});

        return users;
    }

}
