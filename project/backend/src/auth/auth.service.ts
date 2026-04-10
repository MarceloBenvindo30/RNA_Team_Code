import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    this.logger.log(`Attempting login for user: ${loginDto.email}`);

    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      this.logger.warn(`Login failed: User ${loginDto.email} not found`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.isActive) {
      this.logger.warn(`Login failed: User ${loginDto.email} is inactive`);
      throw new UnauthorizedException('Conta inativa. Contate o administrador.');
    }

    const isPasswordValid = await argon2.verify(user.password, loginDto.password);

    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password for ${loginDto.email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email, roles: user.roles };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        isActive: user.isActive,
      },
    };
  }
}
