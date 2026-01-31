import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDTO
{
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    checked: boolean;
}
