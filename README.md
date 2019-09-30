# API para gestão de signup/signin.

O Case apresentado, solicita a criação de uma API RestFul com 3 métodos para gerenciar o signup e signin.

Segue documento da proposta:

## Tecnologia Aplicada na Solução

### A solução para atender o Case proposto, usa Node.js para criar as chamadas Rest de backend, o banco de dados NoSql MongoDB, Docker, Postman.

 - Node.js é uma ambiente baseado em JavaScript, assíncrono e orientado a eventos, permitindo criar servidores leves, rápidos e escaláveis, além de ser multiplataforma (https://nodejs.org/en/).

 - MongoDB é um software de banco de dados orientado a documentos livre, não relacional, de código aberto e multiplataforma. (https://www.mongodb.com/).

 - O Docker é uma plataforma open source que facilita a criação e administração de ambientes isolados (Container).

 - PostMan é a ferramenta que foi utilizada para os testes da API.

## Uso na Aplicação: 

O Node.js é utilizado para desenvolver em linguagem JavaScript a lógica do código que implementa as API Restful.

O MongoDb é nosso banco de dados, onde as informações relacionadas aos recursos serão armanezadas.

O Docker, foi escolhido por ser de fácil implementação e escalabilidade.

Para executar a solução desenvolvida, siga os passos abaixo:

1. Baixe o git o código do projeto.

2. Instale o Node.js e o Docker de acordo com o seu sistema operacional.
Node - https://nodejs.org/en/
Docker - https://docs.docker.com/v17.12/install/
Ferramenta para o desenvolvimento – Sugestão Visual Code https://code.visualstudio.com/download 

3. Instalar as dependências do projeto:
Pelo terminal/cmd, entrar no diretório do projeto, onde fica o package.json e utilizar o comando:
       ```sh
          $ npm install
       ```
4. Baixar e executar o MongoDB no Docker.
Pelo terminal/cm, executar os comandos:
    1. - Baixar a imagem do mongodb:
       ```sh
          $ docker pull tutum/mongodb
       ```
    2. – Criar o servidor:
       ```sh
          $ docker run -d -p 27017:27017 -p 28017:28017 -e AUTH=no tutum/mongodb
       ```
    3. – Subir o servidor mongo:
    
        a) primeiro listar os containers e selecionar o referente ao MongoDB:
              ```sh
                 $ docker ps -a
              ```
           
        b) Iniciar o cliente do servidor:
              ```sh
                 $ docker start ContainerId
              ```
        
5. Inicie o servidor node com o comando:
    ```sh
       $ node server.js
    ```    
    
6. Realizar testes utilizando o Postman, para isso criei uma collection e disponibilizei junto ao código fonte no git, procure por [Postman Collection](https://github.com/pjdsant/skytest/blob/master/postman/SkyUserApi.postman_collection.json)


