import { Controller, Post, Body, Get } from '@nestjs/common'; // Importa decoradores e classes do NestJS
import { UsersService } from './users.service'; // Importa o serviço de usuários
import { User } from './users.entity'; // Importa a entidade de usuário
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importa decoradores do Swagger para documentação
import { CreateUserDto } from './../users/dto/create-user.dto'; // Importa o DTO para criação de usuário

@ApiTags('users') // Adiciona a tag 'users' para agrupar endpoints relacionados a usuários na documentação do Swagger
@Controller('users') // Define que este controlador gerencia rotas que começam com 'users'
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Injeta o serviço de usuários no controlador

  @Post() // Define que este método responde a requisições POST
  @ApiOperation({ summary: 'Cria um novo usuário' }) // Adiciona uma descrição resumida para este endpoint na documentação do Swagger
  @ApiResponse({ status: 201, description: 'O usuário foi criado com sucesso.', type: User }) // Define a resposta de sucesso com status 201 e o tipo de retorno
  @ApiResponse({ status: 400, description: 'Dados inválidos.' }) // Define a resposta de erro com status 400 para dados inválidos
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> { // Define o método para criar um novo usuário, recebendo os dados no corpo da requisição
    const { nome, sobrenome, email, password } = createUserDto; // Desestrutura os dados do DTO
    return this.usersService.createUser(nome, sobrenome, email, password); // Chama o serviço para criar o usuário e retorna o resultado
  }

  @Get() // Define que este método responde a requisições GET
  @ApiOperation({ summary: 'Lista todos os usuários' }) // Adiciona uma descrição resumida para este endpoint na documentação do Swagger
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.', type: [User] }) // Define a resposta de sucesso com status 200 e o tipo de retorno como uma lista de usuários
  async findAll(): Promise<User[]> { // Define o método para listar todos os usuários
    return this.usersService.findAll(); // Chama o serviço para obter a lista de usuários e retorna o resultado
  }
}