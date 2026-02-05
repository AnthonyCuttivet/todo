import { Migration } from '@mikro-orm/migrations';

export class Migration20260204194214 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "todo" add column "title" varchar(255) not null, add column "priority" varchar(255) not null, add column "execution_date" timestamptz null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "todo" drop column "title", drop column "priority", drop column "execution_date";`);
  }

}
