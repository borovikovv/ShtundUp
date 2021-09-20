import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from "./dto/create-user.dto";
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private organizationService: OrganizationsService ){}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);

        return user;
    }

    async setOrganizationToUser(id: number, organizationId: number) {
        const user = await this.userRepository.findAll({ where: { id } });

        // await user.$set("organization", [organizationId])
    }

}
