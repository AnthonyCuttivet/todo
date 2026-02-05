import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateTodoDTO, UpdateTodoDTO } from "./dto/todo.dto";
import { Todo } from "src/database/entities/todo.entity";
import { TodoRepository } from "src/database/repositories/todo.repository";

@Injectable()
export class TodosService {
    constructor(private readonly todoRepository:TodoRepository) {}

    async getTodos() : Promise<Todo[]>
    {
        return this.todoRepository.fetchAllTodos();
    }

    async createTodo(dto: CreateTodoDTO): Promise<Todo>
    {
        try
        {
            const todo = this.todoRepository.createTodo({
                title: dto.title,
                content: dto.content,
                priority: dto.priority,
                executionDate: dto.executionDate,
                checked: dto.checked
            });

            return todo;
        }
        catch(err)
        {
            if(err.name === "ValidationError")
            {
                throw new BadRequestException(err.message);
            }

            console.error(err);

            throw new InternalServerErrorException('Could not create todo');
        }
    }

    async updateTodo(id:number, dto:UpdateTodoDTO) : Promise<Todo>
    {
        return this.todoRepository.updateTodo(id, dto);
    }

    async deleteTodo(id: number): Promise<void>
    {
        await this.todoRepository.deleteTodo(id);
    }
}
