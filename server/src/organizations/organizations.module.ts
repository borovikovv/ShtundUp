import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { User } from 'src/users/users.model';
import { Organization } from "./organizations.model"
import { UserOrganization } from "./organizations-users.model";

@Module({
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    imports: [
        SequelizeModule.forFeature([Organization, User, UserOrganization ])
    ],
    exports: [
        OrganizationsService
    ]
    
})
export class OrganizationsModule {}
