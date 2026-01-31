import api from './api';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types';

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const { data } = await api.get<Todo[]>('/todos');
    return data.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
    }));
  },

  async create(dto: CreateTodoDto): Promise<Todo> {
    const { data } = await api.post<Todo>('/todos', dto);
    return { ...data, createdAt: new Date(data.createdAt) };
  },

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const { data } = await api.patch<Todo>(`/todos/${id}`, dto);
    return { ...data, createdAt: new Date(data.createdAt) };
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
};
