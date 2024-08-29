import { ApiProperty } from '@nestjs/swagger'; // Importa o decorador ApiProperty do Swagger para documentação
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'; // Importa validadores de classe do class-validator

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' }) // Adiciona uma descrição para a propriedade 'nome' na documentação do Swagger
  @IsString() // Valida que o valor deve ser uma string
  @IsNotEmpty() // Valida que o valor não deve ser vazio
  nome: string; // Define a propriedade 'nome' como uma string

  @ApiProperty({ description: 'Sobrenome do usuário' }) // Adiciona uma descrição para a propriedade 'sobrenome' na documentação do Swagger
  @IsString() // Valida que o valor deve ser uma string
  @IsNotEmpty() // Valida que o valor não deve ser vazio
  sobrenome: string; // Define a propriedade 'sobrenome' como uma string

  @ApiProperty({ description: 'Email do usuário' }) // Adiciona uma descrição para a propriedade 'email' na documentação do Swagger
  @IsEmail() // Valida que o valor deve ser um email válido
  @IsNotEmpty() // Valida que o valor não deve ser vazio
  email: string; // Define a propriedade 'email' como uma string

  @ApiProperty({ description: 'Senha do usuário' }) // Adiciona uma descrição para a propriedade 'password' na documentação do Swagger
  @IsString() // Valida que o valor deve ser uma string
  @IsNotEmpty() // Valida que o valor não deve ser vazio
  password: string; // Define a propriedade 'password' como uma string
}