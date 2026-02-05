import {Entity, Enum, PrimaryKey, Property} from '@mikro-orm/core'
import { TodoPriority } from 'src/todos/dto/todo.dto';

@Entity()
export class Todo {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    content!: string;

    @Enum(() => TodoPriority)
    priority!: TodoPriority;

    @Property({ nullable: true })
    executionDate?: string;

    @Property({ default: false })
    checked!: boolean;

    @Property()
    createdAt: Date = new Date();
}
