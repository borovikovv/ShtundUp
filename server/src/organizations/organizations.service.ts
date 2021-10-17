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
        try {
            const hasOrganization = await this.organizationRepository.findOne({where: {name: dto.name}});
            if(hasOrganization) {
                throw new HttpException("Organization name already exist, try another name.", HttpStatus.BAD_REQUEST)
            }
    
            const userInfo:any = await this.authService.decodeToken(headers.authorization);
            const { id } = userInfo;
    
            const organization = await this.organizationRepository.create({...dto, owner: id});
            await this.usersService.setOrganizationOwner(organization.id, id)
    
            return organization;
        } catch (e) {
            console.log(e);
            throw new HttpException("Error, try again", HttpStatus.BAD_REQUEST);
        }
    }

    async deleteOrganization() {
        
    }

    async getAllOrganizationUsers() {
        const users = await this.organizationRepository.findAll({attributes: ["name"]});

        return users;
    }

}
