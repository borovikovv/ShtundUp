import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Organization } from "./organizations.model";

@Table({tableName: "user-organization", createdAt: false, updatedAt: false})
export class UserOrganization extends Model<UserOrganization> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Organization)
    @Column({ type: DataType.INTEGER })
    organizationId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}