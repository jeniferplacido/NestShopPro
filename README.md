# 🌍 **O que é um Ambiente?**

**Ambiente** em tecnologia refere-se ao conjunto de recursos, configurações e condições em que um software é executado ou testado. Cada ambiente é configurado de forma diferente para atender a necessidades específicas durante o ciclo de vida do desenvolvimento e operação de software.

### 🔄 **Tipos de Ambientes**

1. **👩‍💻 Ambiente de Desenvolvimento:**
   - **O que é:** O ambiente onde os desenvolvedores criam e testam o código do software.
   - **Características:**
     - Configurações que permitem a edição e depuração do código.
     - Pode usar dados fictícios ou limitados.
     - Normalmente acessível apenas para a equipe de desenvolvimento.

2. **🔍 Ambiente de Homologação:**
   - **O que é:** O ambiente onde o software é testado antes de ser lançado para o público. É uma réplica do ambiente de produção.
   - **Características:**
     - Configurado para simular o ambiente de produção o mais próximo possível.
     - Usado para testes finais e validações.
     - Acesso para testes e avaliação de qualidade.

3. **🚀 Ambiente de Produção:**
   - **O que é:** O ambiente onde o software está disponível para os usuários finais. É o "ambiente ao vivo".
   - **Características:**
     - Configurado para ser altamente estável e confiável.
     - Gerencia o uso real do software por parte dos usuários.
     - Deve ter alta segurança e desempenho.

### 🤔 **Por Que Usar Diferentes Ambientes?**

**🔒 Segurança e Qualidade:** Separar o desenvolvimento, homologação e produção permite testar e corrigir problemas sem afetar o software que está em uso pelos usuários finais. Isso ajuda a garantir que as alterações e novos recursos sejam lançados com qualidade e sem riscos.

**⚙️ Desempenho e Eficiência:** Ambientes diferentes são otimizados para suas funções específicas. O ambiente de desenvolvimento é flexível para mudanças rápidas, o de homologação é estável para testes finais, e o de produção é otimizado para desempenho e segurança em uso real.

**📉 Gerenciamento de Riscos:** Ao usar diferentes ambientes, você pode identificar e resolver problemas antes que eles impactem os usuários finais, reduzindo o risco de falhas e melhorando a experiência do usuário.

---

- **👩‍💻 Ambiente de Desenvolvimento:** Focado na criação e teste do código. Flexível e instável.
- **🔍 Ambiente de Homologação:** Focado na validação final antes do lançamento. Semelhante ao ambiente de produção.
- **🚀 Ambiente de Produção:** O ambiente onde o software é acessível ao público. Deve ser estável e seguro.

Esses ambientes ajudam a garantir que o software seja bem desenvolvido, testado e lançado com qualidade, minimizando problemas e melhorando a experiência do usuário.

---

## 💾 **Usos de uma Variável de Ambiente**

**🔀 Uma variável muda de acordo com o ambiente onde está rodando,** isso permite que ela aponte para um banco de dados de teste ou um banco de dados de produção apenas mudando o ponteiro de onde está rodando.

**🔐 Outro fator importante é o fator de segurança.** Com variáveis de ambiente podemos ocultar informações sensíveis de nosso código, como credenciais, chaves de acesso, tokens, segredos, etc.

---

# 📦 **dotenv**

O `dotenv` é uma biblioteca para Node.js que carrega variáveis de ambiente a partir de um arquivo `.env` para o `process.env`, facilitando a gestão de configurações e segredos sem precisar codificar essas informações diretamente no código-fonte.

### 🚀 **Como Usar o `dotenv` no NestJS**

#### 1️⃣ **Instalação**

Primeiro, instale o `dotenv` e `@nestjs/config`, que é um pacote específico para integração de variáveis de ambiente no NestJS:

```bash
npm install @nestjs/config dotenv
```

#### 2️⃣ **Criar o Arquivo `.env`**

Crie um arquivo `.env` na raiz do seu projeto. Este arquivo deve conter suas variáveis de ambiente no formato `CHAVE=valor`.

**Exemplo de `.env`:**

```plaintext
DATABASE_URL=postgres://user:password@localhost:5432/ecomerce
USER=seuUsuario
NODE_ENV=development
PORT=3000
```

#### 3️⃣ **Configurar o `ConfigModule`**

No arquivo `app.module.ts`, importe e configure o `ConfigModule` para carregar as variáveis do arquivo `.env`.

**Exemplo de `app.module.ts`:**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Especifica o caminho do arquivo .env
      isGlobal: true,      // Faz com que as variáveis estejam disponíveis globalmente
    }),
    // outros módulos
  ],
  // outros metadados
})
export class AppModule {}
```

#### 4️⃣ **Acessar Variáveis de Ambiente**

Utilize o `ConfigService` para acessar as variáveis de ambiente em seus serviços, controllers, ou qualquer outra parte da aplicação.

**Exemplo de Serviço Usando `ConfigService`:**

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  getApiKey(): string {
    return this.configService.get<string>('API_KEY');
  }

  getPort(): number {
    return this.configService.get<number>('PORT') || 3000;
  }
}
```

#### 5️⃣ **Utilizar em Outros Arquivos**

Você pode acessar variáveis de ambiente em qualquer parte do código que tenha acesso ao `ConfigService`.

**Exemplo de uso em um `main.ts`:**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}

bootstrap();
```

O `dotenv` facilita a configuração e o gerenciamento de variáveis de ambiente em projetos Node.js, incluindo projetos NestJS. Ele permite que você mantenha informações sensíveis e configurações fora do código-fonte e proporciona um ambiente de desenvolvimento mais limpo e flexível. Integrado com o `@nestjs/config`, você pode acessar essas variáveis em todo o seu aplicativo de forma prática e organizada.

---

# 📚 **Swagger**

O Swagger é uma ferramenta popular para documentar APIs RESTful. Ele fornece uma interface gráfica interativa para explorar e testar os endpoints da API, além de gerar documentação legível para os desenvolvedores. No contexto do NestJS, você pode integrar o Swagger para documentar e testar sua API de maneira eficaz.

### 🌐 **Como Integrar o Swagger no NestJS**

#### 1️⃣ **Instalar Dependências**

Para começar, você precisa instalar os pacotes necessários:

```bash
npm install @nestjs/swagger swagger-ui-express
```

#### 2️⃣ **Configurar o Swagger no `main.ts`**

Adicione a configuração do Swagger no arquivo `main.ts`, onde a aplicação NestJS é inicializada.

**Exemplo de `main.ts`:**

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Exemplo API')
    .setDescription('Descrição da API')
    .setVersion('1.0')
    .addTag('tags') // Adiciona tags para agrupar os endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
```

Neste exemplo, o Swagger será acessível em `http://localhost:3000/api`.

#### 3️⃣ **Adicionar Decoradores ao Código**

Para que o Swagger documente seus endpoints corretamente, utilize os decoradores fornecidos pelo pacote `@nestjs/swagger` em seus controllers e DTOs.

**Exemplo de Controller:**

```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  @Get()
  @ApiOperation({ summary: 'Retorna todos os gatos' })
  @ApiResponse({ status: 200, description: 'Lista de gatos retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Gatos não encontrados.' })
  getAll() {
    // Implementação
  }
}
```

**Exemplo de DTO (Data Transfer Object):**

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ example: 'Mittens', description: 'Nome do gato' })
  name: string;

  @ApiProperty({ example: 3, description: 'Idade do gato' })
  age: number;



  @ApiProperty({ example: 'black', description: 'Cor do gato' })
  color: string;
}
```

#### 4️⃣ **Verificar a Documentação**

Após iniciar o servidor, acesse a URL onde o Swagger foi configurado (por exemplo, `http://localhost:3000/api`). Você verá uma interface gráfica que permite explorar e testar os endpoints da API documentados.

O Swagger é uma excelente ferramenta para criar documentação interativa e explorar APIs. Integrar o Swagger no NestJS envolve a instalação dos pacotes necessários, configuração no arquivo `main.ts`, e o uso de decoradores para documentar endpoints e DTOs. Isso proporciona uma maneira visual e interativa para desenvolvedores interagirem com a API, o que pode ser especialmente útil durante o desenvolvimento e testes.

![Demonstração Swagger](../NestShopPro/src/public/img/swagger.gif)

---
# 🛤️ Railway
## 🚀 **Passo a Passo para Deploy no Railway**

### 🧐 **O que é Deploy?**

**Deploy** é o processo de colocar uma aplicação em funcionamento em um servidor, tornando-a acessível aos usuários através da internet. Quando falamos de fazer o deploy de uma aplicação, estamos nos referindo a todo o processo de empacotamento do código, configuração do ambiente, e finalmente, disponibilização do software em produção para os usuários finais.

### 🛤️ **O que é Railway?**

**Railway** é uma plataforma de hospedagem em nuvem que facilita o processo de deploy de aplicações. Ele permite que desenvolvedores publiquem e gerenciem suas aplicações sem se preocupar com a infraestrutura subjacente. É uma ferramenta ideal para desenvolvedores que querem focar no código e nas funcionalidades, sem se preocupar com detalhes complexos de servidores.

### 1️⃣ **Criar Conta no Railway**

1. Acesse o site [Railway](https://railway.app/).
2. Clique em **Sign Up** e escolha como deseja se registrar: via GitHub, Google, ou email.
3. Complete o processo de registro e você será redirecionado para o dashboard da sua conta Railway.

### 2️⃣ **Criar um Banco de Dados PostgreSQL**

1. No dashboard do Railway, clique em **New Project** para criar um novo projeto.
2. Escolha a opção **Provision PostgreSQL**. Este é um banco de dados relacional popular e amplamente utilizado em aplicações web.
3. O Railway irá provisionar (ou seja, configurar e disponibilizar) um novo banco de dados PostgreSQL para seu projeto.
4. Após a criação, você verá as credenciais do banco de dados, como `DATABASE_URL`, que serão usadas na sua aplicação para se conectar ao banco.

### 3️⃣ **Configurar Variáveis de Ambiente no Railway**

1. No dashboard do Railway, vá até a aba **Variables** do seu projeto.
2. Adicione suas variáveis de ambiente, como:

   - `DATABASE_URL`
   - `PORT`

   - Exemplo:
     - `DATABASE_URL=postgres://user:password@host:port/database`
     - `PORT=3000`

### 4️⃣ **Deploy do Projeto no Railway**

1. No dashboard do Railway, clique em **New Project**.
2. Escolha a opção **Deploy from GitHub**.
3. Conecte sua conta do GitHub e selecione o repositório que contém o código do seu projeto.
4. O Railway irá automaticamente clonar o repositório, construir e rodar sua aplicação.
5. Durante o processo, o Railway irá usar as variáveis de ambiente que você configurou anteriormente para configurar a aplicação.

### 5️⃣ **Verificar a URL do Projeto**

1. Após o deploy, o Railway fornecerá uma URL onde sua aplicação estará disponível online.
2. Teste a aplicação acessando essa URL para garantir que tudo esteja funcionando conforme o esperado.

---

## 🎉 **Parabéns! Agora vocês conseguem!**

Vocês chegaram ao fim deste guia e agora têm todas as ferramentas necessárias para configurar ambientes, gerenciar variáveis de ambiente, integrar o Swagger, e fazer o deploy da sua aplicação no Railway! 🚀

Com esses conhecimentos, vocês estão prontas para levar suas aplicações para o próximo nível e compartilhar seu trabalho com o mundo. Não se esqueçam de testar tudo, explorar as possibilidades e continuar aprimorando suas habilidades.

**Boa sorte e continuem criando!** 💪✨

Vamos juntas **reprogramar o mundo** e construir um futuro melhor, uma linha de código por vez! 🌍💻

---

### **Com carinho, ❤️**

**Professora Jenifer Plácido 👩🏾‍💻💻** 

Essa foi a nossa última aula, mas o aprendizado continua. Vocês estão prontas para grandes conquistas. Foi um prazer ensinar e aprender com cada uma de vocês. ✨

---

