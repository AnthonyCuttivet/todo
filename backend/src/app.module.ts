import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import mikroOrmConfig from './mikro-orm.config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    TodosModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
