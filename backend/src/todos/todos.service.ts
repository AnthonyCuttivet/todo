import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateTodoDTO, UpdateTodoDTO } from "./dto/todo.dto";
import { Todo } from "src/database/entities/todo.entity";
import { TodoRepository } from "src/database/repositories/todo.repository";
import { User } from "src/database/entities/user.entity";

@Injectable()
export class TodosService {
    constructor(private readonly todoRepository:TodoRepository) {}

    async getTodos(user:User) : Promise<Todo[]>
    {
        return this.todoRepository.fetchAllTodos(user);
    }

    async createTodo(dto: CreateTodoDTO, user:User): Promise<Todo>
    {
        try
        {
            const todo = await this.todoRepository.createTodo({
                title: dto.title,
                content: dto.content,
                priority: dto.priority,
                executionDate: dto.executionDate,
                checked: dto.checked,
            }, user);

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

    async updateTodo(id:number, dto:UpdateTodoDTO, user:User) : Promise<Todo>
    {
        try
        {
            const todo = await this.todoRepository.updateTodo(id, dto, user);
            return todo;
        }
        catch(err)
        {
            console.error(err);
            throw new InternalServerErrorException('Could not update todo');
        }

    }

    async deleteTodo(id: number, user:User): Promise<void>
    {
        try
        {
            await this.todoRepository.deleteTodo(id, user);
        }
        catch(err)
        {
            console.error(err);
            throw new InternalServerErrorException('Could not delete todo');
        }
    }
}
