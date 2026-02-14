import { Migration } from '@mikro-orm/migrations';

export class Migration20260209160823 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);

    this.addSql(`create table "todo" ("id" serial primary key, "author_id" int not null, "title" varchar(255) not null, "content" varchar(255) not null, "priority" text check ("priority" in ('low', 'medium', 'high')) not null, "execution_date" varchar(255) null, "checked" boolean not null default false, "created_at" timestamptz not null);`);

    this.addSql(`alter table "todo" add constraint "todo_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "todo" drop constraint "todo_author_id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "todo" cascade;`);
  }

}
