const FuncionarioService = require("../services/funcionario.service");

class FuncionarioController {
  constructor() {
    this.funcionarioService = new FuncionarioService();
  }
  async sendToRoute(event) {
    const evetRoute = `${event.httpMethod} ${event.resource}`;
    let requestJSON;

    switch (evetRoute) {
      case "DELETE /funcionario/{id}":
        await this.funcionarioService.deleteById(event.pathParameters.id);
        return `Deleted item ${event.pathParameters.id}`;

      case "GET /funcionario/{id}":
        return await this.funcionarioService.searchById(
          event.pathParameters.id
        );

      case "GET /funcionarios":
        return await this.funcionarioService.getAll();

      case "POST /funcionario":
        requestJSON = JSON.parse(event.body);
        return await this.funcionarioService.insert(requestJSON);

      case "PUT /funcionario":
        requestJSON = JSON.parse(event.body);
        return await this.funcionarioService.update(requestJSON);

      default:
        throw new Error(`Unsupported route: "${JSON.stringify(event)}"`);
    }
  }
}

module.exports = FuncionarioController;
