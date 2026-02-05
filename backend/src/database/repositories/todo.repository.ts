import { EntityManager, RequiredEntityData } from "@mikro-orm/postgresql";
import { Todo } from "../../database/entities/todo.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDTO, UpdateTodoDTO } from "src/todos/dto/todo.dto";

@Injectable()
export class TodoRepository {
  constructor(private readonly em: EntityManager) {}

  async fetchAllTodos(): Promise<Todo[]> {
    return this.em.find(Todo, {});
  }

  async createTodo(dto:CreateTodoDTO): Promise<Todo> {
    const todo = this.em.create(Todo, {
        title: dto.title,
        content: dto.content,
        priority: dto.priority,
        executionDate: dto.executionDate,
        checked: dto.checked,
    } as RequiredEntityData<Todo>);

    this.em.persist(todo);
    return this.em.flush().then(() => todo);
  }

  async updateTodo(id: number, dto: UpdateTodoDTO): Promise<Todo> {
    const todo = await this.em.findOne(Todo, { id });

    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    if (dto.title !== undefined) {
      todo.title = dto.title;
    }

    if (dto.content !== undefined) {
      todo.content = dto.content;
    }

    if (dto.priority !== undefined) {
      todo.priority = dto.priority;
    }

    if (dto.executionDate !== undefined) {
      todo.executionDate = dto.executionDate;
    }

    if (dto.checked !== undefined) {
      todo.checked = dto.checked;
    }

    await this.em.flush();
    return todo;
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.em.findOneOrFail(Todo, { id });

    if(!todo){
      throw new NotFoundException('Todo ${id} not found');
    }

    await this.em.remove(todo);
    await this.em.flush();
  }
}
