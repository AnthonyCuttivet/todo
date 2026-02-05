import { MikroORM, RequiredEntityData } from '@mikro-orm/core';
import { User } from './database/entities/user.entity';
import mikroOrmConfig from './mikro-orm.config';
import { hashPassword } from './auth/utils/password.utils';

async function seed() {
  const orm = await MikroORM.init(mikroOrmConfig);
  const em = orm.em.fork();

  const existingUser = await em.findOne(User, {
    username: 'toto@kresus.eu',
  });

  if (!existingUser) {
    const user = em.create(User, {
      username: 'toto@kresus.eu',
      password: await hashPassword('test'),
    } as RequiredEntityData<User>);

    console.log(user.password);

    em.persist(user);
    await em.flush();
    console.log('Seed user created');
  } else {
    console.log('Seed user already exists');
  }

  await orm.close(true);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
