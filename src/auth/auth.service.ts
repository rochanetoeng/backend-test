import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/services/users.service';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const isValidPassword = await this.usersService.checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) {
      return user;
    }

    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    };

    return {
      ...payload,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
