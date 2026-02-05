import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDTO, UpdateTodoDTO } from "./dto/todo.dto";
import { Todo } from "src/database/entities/todo.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTodos() : Promise<Todo[]>
    {
        return this.todosService.getTodos();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTodo(@Body() dto:CreateTodoDTO) : Promise<Todo>
    {
        return this.todosService.createTodo(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateTodo(@Param('id', ParseIntPipe) id:number, @Body() dto:UpdateTodoDTO) : Promise<Todo>
    {
        return this.todosService.updateTodo(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteTodo(@Param('id') id:number) : Promise<void>
    {
        await this.todosService.deleteTodo(id);
    }
}
