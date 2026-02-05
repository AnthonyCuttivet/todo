import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from './utils/password.utils';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValid = await checkPassword(pass, user.password);

    if(!isValid)
    {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: User)
  {
    const payload = {username: user.username, sub: user.id};
    const token = this.jwtService.sign(payload);

    return { access_token: token, username: user.username };
  }
}
