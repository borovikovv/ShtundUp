import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { User } from 'src/users/users.model';
import { Organization } from "./organizations.model"
import { UserOrganization } from "./organizations-users.model";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    imports: [
        SequelizeModule.forFeature([Organization, User, UserOrganization]),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule)
    ],
    exports: [
        OrganizationsService
    ]
    
})
export class OrganizationsModule {}
