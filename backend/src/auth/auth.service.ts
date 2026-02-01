import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from './utils/password.utils';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log(username, pass);
    const user = await this.usersService.findByUsername(username);
    console.log(user);

    if(!user)
    {
      return null;
    }

    const isValid = await checkPassword(pass, user.password);

    console.log(isValid);

    if(!isValid)
    {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: any)
  {
    const payload = {username: user.username, sub: user.userId};
    return{ access_token: this.jwtService.sign(payload)};
  }
}
