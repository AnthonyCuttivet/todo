import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Todo } from 'src/database/entities/todo.entity';
import { TodoRepository } from './repositories/todo.repository';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([Todo])
  ],
  providers: [
    UserRepository,
    TodoRepository
  ],
  exports: [
    UserRepository,
    TodoRepository,
    MikroOrmModule
  ],
})
export class DatabaseModule {}
