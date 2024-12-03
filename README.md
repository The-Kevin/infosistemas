# API de Gestão de Veículos - Portfólio

## Descrição do Projeto

Este é o backend de uma aplicação voltada para o gerenciamento de veículos, permitindo o controle completo de marcas, modelos e anos-modelo. A API foi projetada para ser modular, escalável e fácil de usar, com suporte a operações CRUD e documentação interativa via Swagger.

---

## Endpoints
- Documentação Swagger: `/api`
- CRUD para:
  - `/brands` (marcas de veículos)
  - `/vehicle-model` (modelos de veículos)
  - `/vehicle-model-year` (anos-modelo de veículos)

**Nota:** O projeto inclui um arquivo `.json` localizado em `/docs` para importação dos endpoints no POSTMAN.

---

## Especificações Técnicas

### Stack Tecnológica
- **Node.js**: v22
- **NestJS**: v10
- **PrismaClient**: v5.22
- **PostgreSQL**: v17

### Configuração HTTP/HTTPS
A API suporta os protocolos HTTP e HTTPS, definidos por meio da variável de ambiente `SSL` (booleano).  
- Certificados e chaves de segurança foram configurados para o ambiente **localhost**, garantindo testes seguros durante o desenvolvimento.  
- **Importante:** Esses certificados não são utilizados em ambientes de produção.

### Banco de Dados
- **PostgreSQL** foi utilizado pela consistência e suporte a estruturas relacionais.  
- Variável de ambiente para conexão: `DATABASE_URL` (formato URI PostgreSQL).  
- Migrações e mudanças de esquema são gerenciadas com Prisma. Os arquivos estão documentados em `/prisma/migrations` e no esquema `/prisma/schema.prisma`.  

O projeto inclui um arquivo `docker-compose.yml` para configuração do banco em ambiente de desenvolvimento.

Diagrama do banco de dados:  
![DB Diagram](docs/database_diagram.png)

---

## Principais Recursos e Funcionalidades
- **Documentação interativa**: A API é totalmente documentada via Swagger, facilitando a exploração e o uso dos endpoints.
- **Operações CRUD completas**: Gerencie marcas, modelos e anos-modelo de veículos de maneira fácil e eficiente.
- **Escalabilidade**: Arquitetura modular que facilita a expansão de novos recursos.

---

## Instruções de Uso

### Ambiente de Desenvolvimento (Linux/macOS)
1. Instale as dependências:
   ```bash
   npm install
    ```
  - Iniciar o banco de dados local:  
    ```bash
    docker compose up -d
    ```
  - Gerar o arquivo `.env`:  
    ```bash
    cp .env.example .env
    ```
  - Caso o servidor deva ser executado em HTTPS, a variável de ambiente `SSL` deve estar configurada como `true`, e os certificados devem ser gerados com o comando:  
    ```bash
    npm run cert:ssl:generate
    ```
  - Executar as migrações no banco de dados:  
    ```bash
    npm run migrate:dev
    ```
  - Iniciar o servidor:  
    ```bash
    npm run start
    ```

### Ambiente de Desenvolvimento (Windows)
  - Baixar as dependências:  
    ```cmd
    npm install
    ```
  - Iniciar o banco de dados local:  
    ```cmd
    docker-compose up -d
    ```
  - Gerar o arquivo `.env`:  
    ```cmd
    copy .env.example .env
    ```
  - Caso o servidor deva ser executado em HTTPS, a variável de ambiente `SSL` deve estar configurada como `true`, e os certificados devem ser gerados com o comando:  
    ```cmd
    npm run cert:ssl:generate
    ```
  - Executar as migrações no banco de dados:  
    ```cmd
    npm run migrate:dev
    ```
  - Iniciar o servidor:  
    ```cmd
    npm run start
    ```
---

## Pontos de Melhoria e Planos Futuros
- Implementar autenticação e autorização para maior segurança.
- Adicionar ferramentas de automação como hooks de **pre-commit** e **pre-push**.
- Expandir o sistema para separar dados específicos de veículos singulares (placa e RENAVAM), caso necessário.

---

## Observações Adicionais
- Testes unitários foram desenvolvidos utilizando **Jest**, devido à sua compatibilidade com o framework NestJS.
- A lógica de negócios está centralizada nos serviços, garantindo separação clara entre responsabilidades.

---

Este projeto demonstra minha habilidade de desenvolver APIs bem estruturadas e escaláveis. Caso tenha interesse em colaborar ou obter mais informações, entre em contato!
