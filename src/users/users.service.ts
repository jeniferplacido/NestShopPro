import { Injectable } from '@nestjs/common'; // Importa o decorador Injectable do NestJS
import { InjectRepository } from '@nestjs/typeorm'; // Importa o decorador InjectRepository do TypeORM
import { Repository } from 'typeorm'; // Importa a classe Repository do TypeORM
import { User } from './users.entity'; // Importa a entidade User

@Injectable() // Marca a classe como um provedor injetável no NestJS
export class UsersService {
  constructor(
    @InjectRepository(User) // Injeta o repositório da entidade User
    private usersRepository: Repository<User>, // Define uma propriedade privada para o repositório de usuários
  ) {}

  // Método para criar um novo usuário
  createUser(nome: string, sobrenome: string, email: string, password: string): Promise<User> {
    const newUser = this.usersRepository.create({ nome, sobrenome, email, password }); // Cria uma nova instância de User com os dados fornecidos
    return this.usersRepository.save(newUser); // Salva o novo usuário no banco de dados e retorna a promessa do usuário salvo
  }

  // Método para encontrar um usuário pelo email
  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email }); // Encontra um usuário pelo email e retorna a promessa do usuário encontrado
  }

  // Método para encontrar um usuário pelo ID
  findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id }); // Encontra um usuário pelo ID e retorna a promessa do usuário encontrado
  }

  // Método para listar todos os usuários
  findAll(): Promise<User[]> {
    return this.usersRepository.find(); // Retorna a promessa de uma lista de todos os usuários
  }
}