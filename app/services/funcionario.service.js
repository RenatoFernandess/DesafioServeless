var AWS = require("aws-sdk");

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  apiVersion: "2012-08-10",
  ...(isTest && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env",
  }),
};

const dynamo = new AWS.DynamoDB.DocumentClient(config);

class FuncionarioService {
  /**
   * Deleta um funcionário pelo seu ID
   * @param {number} id
   */
  async deleteById(idToSearch) {
    await dynamo
      .delete({
        TableName: "Funcionarios",
        Key: {
          id: Number(idToSearch),
        },
      })
      .promise();
  }

  /**
   * Retorna um funcionário pelo seu ID
   * @param {number} id
   * @returns Todos os funcionários
   */
  async searchById(idToSearch) {
    return dynamo
      .get({
        TableName: "Funcionarios",
        Key: {
          id: Number(idToSearch),
        },
      })
      .promise();
  }
  /**
   * Retorna todos os funcionários cadastrados
   * @returns
   */
  async getAll() {
    return dynamo.scan({ TableName: "Funcionarios" }).promise();
  }

  /**
   *  Insere um novo usuário
   * @param {*} requestJSON  Body do evento AWS
   * @returns Usuário afetado
   */
  async insert(requestJSON) {
    await dynamo
      .put({
        TableName: "Funcionarios",
        Item: {
          id: requestJSON.id,
          nome: requestJSON.nome,
          cargo: requestJSON.cargo,
          idade: requestJSON.idade,
        },
      })
      .promise();

    return {
      id: requestJSON.id,
      nome: requestJSON.nome,
      cargo: requestJSON.cargo,
      idade: requestJSON.idade,
    };
  }

  /**
   * Gera uma query de atualização do dynamoDB
   * @param {*} fields
   * @returns
   */
  generateUpdateQuery(fields) {
    delete fields.id;
    let expressionForUpdate = {
      UpdateExpression: "set",
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
    };
    Object.entries(fields).forEach(([key, item]) => {
      expressionForUpdate.UpdateExpression += ` #${key} = :${key},`;
      expressionForUpdate.ExpressionAttributeNames[`#${key}`] = key;
      expressionForUpdate.ExpressionAttributeValues[`:${key}`] = item;
    });
    expressionForUpdate.UpdateExpression =
      expressionForUpdate.UpdateExpression.slice(0, -1);

    return expressionForUpdate;
  }

  /**
   *  Atualiza um registro por ID dentro do dynamoDB
   * @param {*} requestJSON Corpo contendo ID e os campos a serem atualzados
   * @returns
   */
  async update(requestJSON) {
    await dynamo
      .update({
        TableName: "Funcionarios",
        Key: {
          id: requestJSON.id,
        },
        ...this.generateUpdateQuery(requestJSON),
      })
      .promise();

    return {
      id: requestJSON.id,
      nome: requestJSON.nome,
      cargo: requestJSON.cargo,
      idade: requestJSON.idade,
    };
  }
}

module.exports = FuncionarioService;
