# Serveless Challenge

## Sobre

Eu escolhi fazer uma infra estrutura com DynamoDB para o deploy

A pasta de testes está separada da app para diminuir o tamanho total a ser lançado dentro da aws

## Deploy

Dentro da pasta terraform estão todos os arquivos necessários para a provisão dos recursos necessários com terraform

```bash
cd terraform

terraform apply
```

Obs: Ainda será necessário autorizar a função dentro do IAM para operações do Dynamodb

## Métodos HTTP

### PUT /funcionario

Atualiza um registro no banco

```json

{
    id:number //Obrigatório
    nome:string
    cargo:string
    idade:number
}

```

### POST /funcionario

Cria um registro em banco

```json

{
    id:number
    nome:string
    cargo:string
    idade:number
}

```

### DELETE /funcionario/{ID}

Deleta um registro por Id

### GET /funcionario/{ID}

Recupera um registro por Id

### GET /funcionarios

Recupera todos os registros
