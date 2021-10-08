import { ApiProperty } from "@nestjs/swagger"

export class AddRoleDto {
    @ApiProperty({example: "Only user, admin, moderator", description: "Need create validator and set only allowed roles"})
    readonly value: string;

    @ApiProperty({example: "example@gmail.com", description: "user email"})
    readonly userId: number;
}