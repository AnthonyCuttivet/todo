import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Todo } from 'src/database/entities/todo.entity';
import { TodoRepository } from './repositories/todo.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([Todo])
  ],
  providers: [TodoRepository],
  exports: [
    TodoRepository,
    MikroOrmModule
  ],
})
export class DatabaseModule {}
