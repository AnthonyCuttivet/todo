export interface Todo {
    id: number;
    content: string;
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
    content: string;
    checked: boolean;
  }

  export interface UpdateTodoDto {
    content?: string;
    checked?: boolean;
  }
