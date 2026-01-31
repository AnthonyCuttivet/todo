import { Module } from "@nestjs/common";
import { TodosController } from "./todos.controller";
import { TodosService } from "./todos.service";
import { DatabaseModule } from "src/database/database.module";
import { TodoRepository } from "src/database/repositories/todo.repository";

@Module({
    imports: [DatabaseModule],
    controllers : [TodosController],
    providers : [TodosService, TodoRepository],
})
export class TodosModule {}
