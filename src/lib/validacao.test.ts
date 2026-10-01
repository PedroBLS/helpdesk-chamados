import { expect, test } from "vitest";
import { validarChamado } from "./validacao";

const valido = {
  titulo: "Impressora não imprime",
  descricao: "A impressora do RH sai com folhas em branco.",
  solicitante: "Carlos Lima",
  email: "carlos@empresa.com.br",
  categoria: "Hardware",
  prioridade: "media",
};

test("chamado completo não tem erros", () => {
  expect(validarChamado(valido)).toEqual({});
});

test("aponta cada campo inválido", () => {
  const erros = validarChamado({ ...valido, titulo: "PC", email: "carlos@", categoria: "", prioridade: "altissima" });
  expect(Object.keys(erros).sort()).toEqual(["categoria", "email", "prioridade", "titulo"]);
});

test("espaços em branco não contam como texto", () => {
  expect(validarChamado({ ...valido, solicitante: "   " }).solicitante).toBeDefined();
});
