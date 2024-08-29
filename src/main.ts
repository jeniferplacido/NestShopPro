import { NestFactory } from '@nestjs/core'; // Importa a fábrica Nest para criar a aplicação
import { AppModule } from './app.module'; // Importa o módulo principal da aplicação
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Importa classes para configurar e criar a documentação Swagger
import { ValidationPipe } from '@nestjs/common'; // Importa o ValidationPipe para validação global

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Cria a aplicação Nest usando o módulo principal

  app.useGlobalPipes(new ValidationPipe()); // Aplica o ValidationPipe globalmente para validar todas as entradas

  const config = new DocumentBuilder()
    .setTitle('API NESTSHOP') // Define o título da documentação Swagger
    .setDescription('API do eCommerce NESTSHOP em NestJS') // Define a descrição da documentação Swagger
    .setVersion('1.0') // Define a versão da API
    .addTag('users') // Adiciona uma tag 'users' para agrupar endpoints relacionados a usuários
    .build(); // Constrói o objeto de configuração do Swagger

  const document = SwaggerModule.createDocument(app, config); // Cria o documento Swagger com base na configuração e na aplicação
  SwaggerModule.setup('api', app, document); // Configura o endpoint '/api' para servir a documentação Swagger

  await app.listen(3000); // Inicia a aplicação na porta 3000
}
bootstrap(); // Chama a função bootstrap para iniciar a aplicação