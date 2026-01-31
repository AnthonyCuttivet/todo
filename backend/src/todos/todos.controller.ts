import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDTO } from "./dto/create-todo.dto";
import { Todo } from "src/database/entities/todo.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getTodos() : Promise<Todo[]>
    {
        return this.todosService.getTodos();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createTodo(@Body() dto:CreateTodoDTO) : Promise<Todo>
    {
        return this.todosService.createTodo(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTodo(@Param('id') id:number) : Promise<void>
    {
        return this.todosService.deleteTodo(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTodo(@Param('id') id:number) : Promise<void>
    {
        await this.todosService.deleteTodo(id);
    }
}
