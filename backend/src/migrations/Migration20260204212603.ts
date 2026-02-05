import { Migration } from '@mikro-orm/migrations';

export class Migration20260204212603 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "todo" alter column "priority" type text using ("priority"::text);`);
    this.addSql(`alter table "todo" alter column "execution_date" type varchar(255) using ("execution_date"::varchar(255));`);
    this.addSql(`alter table "todo" alter column "checked" type boolean using ("checked"::boolean);`);
    this.addSql(`alter table "todo" alter column "checked" set default false;`);
    this.addSql(`alter table "todo" add constraint "todo_priority_check" check("priority" in ('low', 'medium', 'high'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "todo" drop constraint if exists "todo_priority_check";`);

    this.addSql(`alter table "todo" alter column "priority" type varchar(255) using ("priority"::varchar(255));`);
    this.addSql(`alter table "todo" alter column "execution_date" type timestamptz using ("execution_date"::timestamptz);`);
    this.addSql(`alter table "todo" alter column "checked" drop default;`);
    this.addSql(`alter table "todo" alter column "checked" type boolean using ("checked"::boolean);`);
  }

}
