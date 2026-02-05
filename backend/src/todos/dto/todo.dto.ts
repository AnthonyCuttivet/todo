import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, isString, IsString, MaxLength } from "class-validator";

export enum TodoPriority
{
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

const TODO_TITLE_MAX_LENGTH:number = 50;
const TODO_CONTENT_MAX_LENGTH:number = 256;

export class CreateTodoDTO
{
    @IsString()
    @IsNotEmpty()
    @MaxLength(TODO_CONTENT_MAX_LENGTH)
    title:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(TODO_TITLE_MAX_LENGTH)
    content: string;

    @IsEnum(TodoPriority)
    priority:TodoPriority;

    @IsOptional()
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsDateString()
    executionDate?:string;

    @IsBoolean()
    checked: boolean;
}

export class UpdateTodoDTO
{
    @IsString()
    @IsNotEmpty()
    @MaxLength(TODO_CONTENT_MAX_LENGTH)
    title:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(TODO_TITLE_MAX_LENGTH)
    content: string;

    @IsEnum(TodoPriority)
    priority:TodoPriority;

    @IsOptional()
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsDateString()
    executionDate?:string;

    @IsBoolean()
    checked: boolean;
}
