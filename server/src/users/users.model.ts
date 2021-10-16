import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, BelongsToMany, BelongsTo, HasMany } from "sequelize-typescript";
import { AdminOrganization } from "src/organizations/organization-admins.model";
import { UserOrganization } from "src/organizations/organizations-users.model";
import { Organization } from "src/organizations/organizations.model";

interface UserCreationAttrs {
    email: string,
    password: string
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: "example@gmail.com", description: "user email"})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({example: "12345qwer", description: "user password"})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    password: string

    @ApiProperty({example: "I'm batman!", description: "status"})
    @Column({ type: DataType.STRING })
    status: string

    @ApiProperty({example: 23, description: "How old are you?"})
    @Column({ type: DataType.INTEGER })
    age: number

    @ApiProperty({example: "Скопец, холост і т.д", description: "Random string about User"})
    @Column({ type: DataType.STRING })
    title: string

    @ApiProperty({example: "male, female", description: "User gender"})
    @Column({ type: DataType.ENUM, values: ["male", "female"] })
    gender: string

    @ApiProperty({example: "married unmarried", description: "User married status"})
    @Column({ type: DataType.ENUM, values: ["married", "unmarried"] })
    married: string

    @ApiProperty({example: "Taras Petrovich", description: "User name"})
    @Column({ type: DataType.STRING })
    name: string

    @BelongsToMany(() => Organization, () => UserOrganization)
    organization: Organization[];

    @BelongsToMany(() => Organization, () => AdminOrganization)
    admin: Organization[];

    @HasMany(() => Organization)
    owner: Organization[]
}