import { Module } from '@nestjs/common'; // Importa o decorador Module do NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o módulo TypeOrmModule do TypeORM
import { UsersService } from './users.service'; // Importa o serviço de usuários
import { UsersController } from './users.controller'; // Importa o controlador de usuários
import { User } from './users.entity'; // Importa a entidade de usuário

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registra a entidade User no TypeOrmModule para que possa ser usada no repositório
  providers: [UsersService], // Registra o serviço de usuários como um provedor
  controllers: [UsersController], // Registra o controlador de usuários
  exports: [UsersService], // Exporta o serviço de usuários para que possa ser usado em outros módulos
})
export class UsersModule {} // Define a classe UsersModule como um módulo do NestJS