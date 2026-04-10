import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ========== CORS Configuration ==========
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600,
  });

  // ========== Global Validation Pipe ==========
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT || 5500; 
  await app.listen(port);
  
  console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
  console.log(`✓ CORS habilitado para: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
}
bootstrap();
