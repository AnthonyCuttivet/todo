import { EntityManager, RequiredEntityData } from "@mikro-orm/postgresql";
import { Todo } from "../../database/entities/todo.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTodoDTO } from "src/todos/dto/create-todo.dto";

@Injectable()
export class TodoRepository {
  constructor(private readonly em: EntityManager) {}

  fetchAllTodos(): Promise<Todo[]> {
    return this.em.find(Todo, {});
  }

  createTodo(dto:CreateTodoDTO): Promise<Todo> {
    const todo = this.em.create(Todo, {
        content: dto.content,
        checked: dto.checked,
    } as RequiredEntityData<Todo>);

    this.em.persist(todo);
    return this.em.flush().then(() => todo);
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
