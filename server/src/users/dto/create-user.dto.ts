import { ApiProperty } from "@nestjs/swagger"
export class CreateUserDto {

    @ApiProperty({example: "example@gmail.com", description: "user email"})
    readonly email: string
    @ApiProperty({example: "12345qwe", description: "user password"})
    readonly password: string
}