import { Migration } from '@mikro-orm/migrations';

export class Migration20260130142452 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "todo" ("id" serial primary key, "content" varchar(255) not null, "checked" boolean not null, "created_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "todo" cascade;`);
  }

}
