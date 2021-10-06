import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import  { User }  from "src/users/users.model";

interface TokenCreationAttrs {
    token: string
}

@Table({tableName: "token", createdAt: false, updatedAt: false})
export class Token extends Model<Token, TokenCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({description: "User refresh token"})
    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    token: string

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @ApiProperty({description: "Ref to user"})
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId: number
}