import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  findByUsername(username: string) {
    return this.userRepo.findByUsername(username);
  }
}

