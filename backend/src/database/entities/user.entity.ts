import {Entity, PrimaryKey, Property, Unique} from '@mikro-orm/core'

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    @Unique()
    username!: string;

    @Property({hidden:true})
    password!: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date;
}
