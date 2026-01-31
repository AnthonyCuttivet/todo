import {Entity, PrimaryKey, Property} from '@mikro-orm/core'

@Entity()
export class Todo {
    @PrimaryKey()
    id!: number;

    @Property()
    content!: string;

    @Property()
    checked!: boolean;

    @Property()
    createdAt: Date = new Date();
}
