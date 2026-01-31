import { Injectable } from "@nestjs/common";
import { CreateTodoDTO } from "./dto/create-todo.dto";
import { Todo } from "src/database/entities/todo.entity";
import { TodoRepository } from "src/database/repositories/todo.repository";

@Injectable()
export class TodosService {
    constructor(private readonly todoRepository:TodoRepository) {}

    getTodos() : Promise<Todo[]>
    {
        return this.todoRepository.fetchAllTodos();
    }

    createTodo(dto: CreateTodoDTO): Promise<Todo>
    {
        return this.todoRepository.createTodo({ content: dto.content, checked: dto.checked });
    }

    async deleteTodo(id: number): Promise<void>
    {
        await this.todoRepository.deleteTodo(id);
    }
}
