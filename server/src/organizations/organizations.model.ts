import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, BelongsToMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { AdminOrganization } from "./organization-admins.model";
import { UserOrganization } from "./organizations-users.model";

interface OrganizationsCreationAttrs {
    name: string,
    color: string,
    open: boolean,
    owner: number
}

@Table({tableName: "organizations"})
export class Organization extends Model<Organization, OrganizationsCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: "high_school", description: "set name to You organization"})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string

    @ApiProperty({example: "steelblue", description: "set color you organization"})
    @Column({ type: DataType.STRING, values: ["red", "blue", "green", "steelblue", "tomato"] })
    color: string

    @ApiProperty({example: "true or false", description: "IF Needed request to join you organization"})
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    open: boolean

    @BelongsToMany(() => User, () => UserOrganization)
    users: User[];

    @BelongsToMany(() => User, () => AdminOrganization)
    admins: User[];

    @BelongsTo(() => User)
    ownerId: number

    @ForeignKey(() => User)
    userId: number
}