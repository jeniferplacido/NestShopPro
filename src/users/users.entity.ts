import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // Importa decoradores e classes do TypeORM
import { ApiProperty } from '@nestjs/swagger'; // Importa o decorador ApiProperty do Swagger para documentação

@Entity() // Marca a classe como uma entidade do TypeORM
export class User {
  @PrimaryGeneratedColumn() // Define a coluna 'id' como uma chave primária gerada automaticamente
  @ApiProperty({ description: 'ID único do usuário' }) // Adiciona uma descrição para a propriedade 'id' na documentação do Swagger
  id: number; // Define a propriedade 'id' como um número

  @Column() // Marca a propriedade 'nome' como uma coluna no banco de dados
  @ApiProperty({ description: 'Nome do usuário' }) // Adiciona uma descrição para a propriedade 'nome' na documentação do Swagger
  nome: string; // Define a propriedade 'nome' como uma string

  @Column() // Marca a propriedade 'sobrenome' como uma coluna no banco de dados
  @ApiProperty({ description: 'Sobrenome do usuário' }) // Adiciona uma descrição para a propriedade 'sobrenome' na documentação do Swagger
  sobrenome: string; // Define a propriedade 'sobrenome' como uma string

  @Column() // Marca a propriedade 'email' como uma coluna no banco de dados
  @ApiProperty({ description: 'Email do usuário' }) // Adiciona uma descrição para a propriedade 'email' na documentação do Swagger
  email: string; // Define a propriedade 'email' como uma string

  @Column() // Marca a propriedade 'password' como uma coluna no banco de dados
  @ApiProperty({ description: 'Senha do usuário' }) // Adiciona uma descrição para a propriedade 'password' na documentação do Swagger
  password: string; // Define a propriedade 'password' como uma string
}