import { afterEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { FormNovoChamado } from "./FormNovoChamado";

afterEach(cleanup);

test("mostra os erros ao enviar vazio e não registra o chamado", () => {
  render(<FormNovoChamado />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir chamado" }));
  expect(screen.getByText("Informe um e-mail válido.")).toBeDefined();
  expect(screen.getByLabelText("Assunto").getAttribute("aria-invalid")).toBe("true");
  expect(screen.queryByRole("status")).toBeNull();
});

test("o erro de um campo some assim que ele é corrigido", () => {
  render(<FormNovoChamado />);
  fireEvent.click(screen.getByRole("button", { name: "Abrir chamado" }));
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "teste@exemplo.com" } });
  expect(screen.queryByText("Informe um e-mail válido.")).toBeNull();
  expect(screen.getByText("Informe quem está abrindo o chamado.")).toBeDefined();
});

test("registra o chamado quando tudo está preenchido", () => {
  render(<FormNovoChamado />);
  const preencher = (rotulo: string, valor: string) => fireEvent.change(screen.getByLabelText(rotulo), { target: { value: valor } });
  preencher("Assunto", "VPN não conecta");
  preencher("Seu nome", "Mariana Costa");
  preencher("E-mail", "mariana@empresa.com.br");
  preencher("Categoria", "Rede");
  preencher("Prioridade", "alta");
  preencher("Descrição", "Erro de autenticação desde a troca de senha.");
  fireEvent.click(screen.getByRole("button", { name: "Abrir chamado" }));
  expect(screen.getByRole("status").textContent).toContain("Chamado registrado!");
});
