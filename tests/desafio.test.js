describe("Testes unitários para desafio - service", function () {
  const FuncionarioService = require("../app/services/funcionario.service");
  let funcionarioService;
  test("Creation of funcionarioService", async () => {
    funcionarioService = new FuncionarioService();

    expect(funcionarioService).toBeDefined();
  });

  test("add new item in table", async () => {
    const mock = {
      id: 1,
      nome: "Renato",
      cargo: "Desenvolvedor",
      idade: "24",
    };
    result = await funcionarioService.insert(mock);

    expect(result).toEqual({
      id: 1,
      nome: "Renato",
      cargo: "Desenvolvedor",
      idade: "24",
    });
  });

  test("get item in table", async () => {
    const id = 1;
    result = await funcionarioService.searchById(id);

    expect(result.Item).toEqual({
      id: 1,
      nome: "Renato",
      cargo: "Desenvolvedor",
      idade: "24",
    });
  });

  test("get all items in table", async () => {
    const id = 1;
    result = await funcionarioService.getAll();

    expect(result.Items[0]).toEqual({
      id: 1,
      nome: "Renato",
      cargo: "Desenvolvedor",
      idade: "24",
    });
    expect(result.Items.length).toBeGreaterThan(0);
  });

  test("update item in table", async () => {
    const mock = {
      id: 1,
      cargo: "Desenvolvedor II",
    };

    await funcionarioService.update(mock);

    result = await funcionarioService.searchById(1);

    expect(result.Item).toEqual({
      id: 1,
      nome: "Renato",
      cargo: "Desenvolvedor II",
      idade: "24",
    });
  });

  test("delete item in table", async () => {
    const id = 1;
    await funcionarioService.deleteById(id);

    result = await funcionarioService.getAll();
    expect(result.Items[0]).toBeUndefined();
    expect(result.Items.length).toBe(0);

    result = await funcionarioService.searchById(id);
    expect(result).toEqual({});
  });
});
