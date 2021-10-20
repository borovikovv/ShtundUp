import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from "./dto/create-user.dto";
import { OrganizationsService } from 'src/organizations/organizations.service';
import { AddRoleDto } from './dto/add-role.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    @Inject(forwardRef(() => OrganizationsService))  private organizationService: OrganizationsService,
    @Inject(forwardRef(() => AuthService))  private authService: AuthService,
    ){}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });

        return user;
    }

    async findUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });

        return user;
    }

    async setOrganizationToUser(id: number, organizationId: number) {
        const user = await this.userRepository.findOne({ where: { id } });

        // await user.$set("organization", [organizationId])
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();

        return users;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);

        if(user) {
            
            return dto;
        }

        throw new HttpException("Not found user", HttpStatus.NOT_FOUND)
    }

    async setOrganizationOwner(organizationId: number, userId: number) {
        const user = await this.userRepository.findByPk(userId);

        if(user) {
            await user.$set('organization', [organizationId])
            return user;
        }

        throw new HttpException("Owner not set, try again.", HttpStatus.BAD_REQUEST)
    }

    async getUserInfo(header) {
        const userInfo:any = await this.authService.decodeToken(header.authorization);
        const { id } = userInfo;
        const user = await this.getUserByEmail(id);

        return user;
    }

}
