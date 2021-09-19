import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserOrganization } from "./organizations-users.model";

interface OrganizationsCreationAttrs {
    name: string,
    color: string,
    open: boolean
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

    @ApiProperty({example: "true or false", description: "Need request to join you organization or no"})
    @Column({ type: DataType.BOOLEAN })
    open: boolean

    @BelongsToMany(() => User, () => UserOrganization)
    users: User[];

}