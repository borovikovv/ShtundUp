import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizationDto {

    @ApiProperty({example: "best_group_ever", description: "type organization name"})
    readonly name: string;

    @ApiProperty({example: "blue", description: "chooze color at palete"})
    readonly color: string;

    @ApiProperty({example: "true or false", description: "Send request to accept in organization"})
    readonly open: boolean 
}