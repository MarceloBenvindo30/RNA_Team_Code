import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  async onModuleInit() {

    await this.seedSuperAdmin();
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  private async seedSuperAdmin() {
    const email = this.configService.get<string>('SUPER_ADMIN_EMAIL');
    const password = this.configService.get<string>('SUPER_ADMIN_PASSWORD');

    if (!email || !password) {
      this.logger.error('⚠️ SUPER_ADMIN_EMAIL ou PASSWORD não definidos no .env');
      return;
    }

    try {

      const adminExists = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (adminExists) {
        this.logger.log(`✅ Super Admin (${email}) já está no banco. Seed ignorado.`);
        return;
      }


      this.logger.log(`🚀 Criando Super Admin: ${email}...`);
      const hashedPassword = await argon2.hash(password);

      await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name: 'Super Admin',
          roles: ['SUPER_ADMIN', 'ADMIN', 'USER'],
          isActive: true,
        },
      });

      this.logger.log(`🎉 Super Admin criado com sucesso!`);
    } catch (error) {
      this.logger.error('❌ Erro ao rodar o seed do Super Admin:', error);
    }
  }
}