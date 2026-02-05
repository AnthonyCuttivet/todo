export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
    id: number;
    title: string;
    content: string;
    priority: TodoPriority;
    executionDate:Date | null;
    checked: boolean;
    createdAt: Date;
  }

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface CreateTodoDto {
  title: string;
  content: string;
  priority: string;
  executionDate?:Date | null;
  checked: boolean;
}

export interface UpdateTodoDto {
  title: string;
  content: string;
  priority: TodoPriority;
  executionDate?:Date | null;
  checked?: boolean;
}
