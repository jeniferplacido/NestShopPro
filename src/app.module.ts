import { Module, OnModuleInit, Logger } from '@nestjs/common'; // Importa decoradores e classes do NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o módulo TypeOrmModule do TypeORM
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa o módulo ConfigModule e a classe ConfigService do NestJS Config
import { DataSource } from 'typeorm'; // Importa a classe DataSource do TypeORM
import { UsersModule } from './users/users.module'; // Importa o módulo de usuários

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Configura o módulo de configuração como global, disponível em toda a aplicação
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa o módulo de configuração para uso na configuração do TypeORM
      inject: [ConfigService], // Injeta o serviço de configuração para acessar variáveis de ambiente
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Define o tipo de banco de dados como PostgreSQL
        host: configService.get<string>('DB_HOST'), // Obtém o host do banco de dados das variáveis de ambiente
        port: configService.get<number>('DB_PORT'), // Obtém a porta do banco de dados das variáveis de ambiente
        username: configService.get<string>('DB_USERNAME'), // Obtém o nome de usuário do banco de dados das variáveis de ambiente
        password: configService.get<string>('DB_PASSWORD'), // Obtém a senha do banco de dados das variáveis de ambiente
        database: configService.get<string>('DB_DATABASE'), // Obtém o nome do banco de dados das variáveis de ambiente
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Define o caminho para as entidades do TypeORM
        synchronize: true, // Habilita a sincronização automática das entidades com o banco de dados
      }),
    }),
    UsersModule, // Importa o módulo de usuários
  ],
})
export class AppModule implements OnModuleInit { // Implementa a interface OnModuleInit para executar código na inicialização do módulo
  private readonly logger = new Logger(AppModule.name); // Cria uma instância do Logger para o módulo AppModule

  constructor(private dataSource: DataSource) {} // Injeta a fonte de dados do TypeORM no construtor

  async onModuleInit() { // Método executado na inicialização do módulo
    if (this.dataSource.isInitialized) { // Verifica se a conexão com o banco de dados já está estabelecida
      this.logger.log('Banco de dados postgres ja conectado'); // Loga uma mensagem indicando que a conexão já está estabelecida
    } else {
      try {
        await this.dataSource.initialize(); // Tenta inicializar a conexão com o banco de dados
        this.logger.log('Banco de dados postgres conectado com sucesso'); // Loga uma mensagem indicando que a conexão foi estabelecida com sucesso
      } catch (err) {
        this.logger.error('Falha ao conectar no banco de dados', err); // Loga uma mensagem de erro caso a conexão falhe
      }
    }
  }
}