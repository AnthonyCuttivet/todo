import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByUsername: jest.fn(),
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('fake-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should return a jwt token', async () => {
    const user = { id: 1, username: 'aled' };

    const result = authService.login(user);

    expect(result).toEqual({
      access_token: 'fake-jwt-token',
    });
  });
});
