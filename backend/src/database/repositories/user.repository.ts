import { EntityManager, RequiredEntityData } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository {
  constructor(private readonly em: EntityManager) {}

  async findByUsername(username: string): Promise<User | null> {
    const em = this.em.fork();
    return em.findOne(User, { username });
  }
}

