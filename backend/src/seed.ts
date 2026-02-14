import { MikroORM, RequiredEntityData } from '@mikro-orm/core';
import { User } from './database/entities/user.entity';
import mikroOrmConfig from './mikro-orm.config';
import { hashPassword } from './auth/utils/password.utils';
import { EntityManager } from '@mikro-orm/postgresql';

async function seed() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em:EntityManager = orm.em.fork();

  await createUser(em, 'one@mail.com', 'test');
  await createUser(em, 'two@mail.com', 'test');

  await orm.close(true);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function createUser(em:EntityManager, username:string, password:string)
{
  const existingUser = await em.findOne(User, {
    username: username,
  });

  if (!existingUser) {
    const user = em.create(User, {
      username: username,
      password: await hashPassword(password),
    } as RequiredEntityData<User>);

    em.persist(user);
    await em.flush();
    console.log('Seeded user ' + user.username + ' created');
  }
  else {
    console.log('Seeded user ' + existingUser.username + ' already exists');
  }
}
