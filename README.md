#  Production Automation Tool Back-End

**Aluno: Jaquinei de Oliveira**

Este projeto faz parte do *MVP* do *Sprint 3* da Disciplina **Desenvolvimento Front-End Avançado**.

O objetivo é apresentar o resultado prático obtido após o estudo do conteúdo apresentado ao longo das aulas das disciplinas apresentadas durante este Sprint.

O MVP consiste em um *Front-End*, um *Back-End* e o acesso a uma *API* externa.

Este repositorio faz parte do MVP e contem o código para o Back-End e o código usado para acesso a uma *API* externa. 

O Back-End disponibilizado neste repositório contem o docker file possibilitando rodar containerizado. 

As instruções para fazer o build da imagem e rodar os container estão na seção [Como iniciar o Back-End usando o docker](#como-iniciar-o-back-end-usando-o-docker)

**Este README foca nos detalhes de setup e uso do projeto do Back-End.**

**Para detalhes sobre o projeto do Front-End, acesse o repositório https://github.com/Jaquinei/mvp_3_puc_rio_frontend**

## Back-End (*API*)

 O Back-End foi desenvolvido utilizando Node.js com o framework Express como servidor web. O Backend disponibiliza uma API REST que é consumida pelo Front-End. Esta API possibilita que dados disponíveis no Notion sejam consumidos pelo Front-End. O acesso aos dados do Notion é realizado pelo Back-End através da API disponibilizada pelo Notion.

O código do Back-End está disponível neste repositorio.

# Executando o projeto

## Como iniciar o Back-End usando o docker:

### Siga os passos abaixo:

- Certifique-se que o Docker esteja instalado

- Crie a imagem

```
docker build -t backend_puc_rio_sprint_3_mvp .
```
- Mapeie a porta local 4000 do host para a porta 4000 do container
```
docker run -e API_EXTERNA_DATABASE_ID=XXXXXXXXXXX -e API_EXTERNA_TOKEN=YYYYYYYYYYYY  -d -p 4000:4000 backend_puc_rio_sprint_3_mvp
```
- Acesse a URL http://localhost:4000 no navegador para confirmar que o o servidor está rodando. Uma mensagem informando que o servidor está operacional será informada na tela.

# Visão geral dos módulos do MVP

## Front-End (Interface)

O Front-End foi desenvolvido usando *React*, *Material UI*, *CSS* e *JavaScript*. Pode ser usado independentemente do Back-End, mas para acessar a API externa do Notion é necessário que o Back-End esteja rodando.

O código do Front-End está disponível em outro repositório. Para detalhes sobre o projeto do Front-End, acesse o repositório https://github.com/Jaquinei/mvp_3_puc_rio_frontend

## Back-End (API)

A REST API é disponibilizada pelo Back-End e apresenta as seguintes rotas:

    GET /
Redireciona para o Swagger

    POST /notion
Acessa dados de uma API externa do Notion.
Requisitos: API_EXTERNA_DATABASE_ID e API_EXTERNA_TOKEN devem ser fornecidos.

## Acesso a uma API externa

O acesso a API externa está sendo feito utilizando a API da Notion (https://developers.notion.com/)

Para o Back-End acessar a API é necessário utilizar as seguintes informações:
- Notion API URL
- Token Notion
- Database ID

Estas informações (*Notion API URL, Token e Database ID*) serão disponibilizadas no texto de submissão deste MVP.

Foi criada um Notion page com uma lista de Tasks. Essas tasks podem ser incluidas no Prodution Automation Tool. Para acessar a lista do Notion, diretamente, o seguinte link pode ser usado (https://www.notion.so/22816f12775a80beaa58d7458bc9e47d?v=22816f12775a818c917e000c9faf79b2&source=copy_link).


# Development environment 

## Como executar o Back-End

### Dev
Será necessário ter instaladas todas as bibliotecas Node listadas no arquivo `package.json`.

Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

Installe todas as dependencias necessárias para rodar o projeto
```
$ npm install
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `package.json`.

Crie um arquivo na raiz do projeto chamado *.env* com duas entradas (API_EXTERNA_DATABASE_ID e API_EXTERNA_TOKEN):

```
API_EXTERNA_DATABASE_ID=XXXXXXX
API_EXTERNA_TOKEN=YYYYYYYY
```
Substitua XXXXXXX e YYYYYYYY com o as informações providenciadas por e-mail durante a submissão do projeto pelo Portal da PUC-RIO.

Para executar o Back-End que expõe a API:

```
$ npm start
```
A porta **4000** está hardcode no projeto do Back-End.

Abra o link [http://localhost:4000](http://localhost:4000/) no navegador para verificar o status da API em execução.

External API access

Para acessar o database do Notion diretamente, é possível usar o seguinte comando:

```
curl -X POST \
'https://api.notion.com/v1/databases/<database>/query' \
-H 'Authorization: Bearer <token>' \
-H 'Notion-Version: 2021-05-13' \
-H 'Content-Type: application/json'
```

### Docker

- Certifique-se que o Docker esteja instalado
- Cria a imagem
```
docker build -t backend_puc_rio_sprint_3_mvp .
```
- Mapeia a porta local 4000 do host para a porta 4000 do container
```
docker run -e API_EXTERNA_DATABASE_ID=XXXXXXX -e API_EXTERNA_TOKEN=YYYYYYYY -d -p 4000:4000 backend_puc_rio_sprint_3_mvp
```
- Acesse a URL http://localhost4000 no navegador para verificar se o servidor está operacional
