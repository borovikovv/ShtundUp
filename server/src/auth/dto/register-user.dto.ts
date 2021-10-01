import { ApiProperty } from "@nestjs/swagger"

export class RegisterUserDto {
    @ApiProperty({example: "example@gmail.com", description: "user email"})
    email: string;

    @ApiProperty({example: "1234qwer", description: "user password"})
    password: string;

    @ApiProperty({example: "user", description: "default user role"})
    role = "user";
  }