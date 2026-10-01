import { describe, expect, test } from "vitest";
import { prazoFinal, situacaoSla } from "./sla";

const abertura = new Date("2026-10-01T09:00:00-03:00");
const horasDepois = (h: number) => new Date(abertura.getTime() + h * 60 * 60 * 1000);

describe("prazoFinal", () => {
  test("soma o prazo da prioridade à abertura", () => {
    expect(prazoFinal(abertura, "urgente")).toEqual(horasDepois(4));
    expect(prazoFinal(abertura, "baixa")).toEqual(horasDepois(48));
  });
});

describe("situacaoSla", () => {
  test("chamado aberto dentro do prazo", () => {
    expect(situacaoSla({ abertoEm: abertura, prioridade: "alta" }, horasDepois(2))).toBe("no_prazo");
  });

  test("entra em risco com 80% do prazo consumido", () => {
    expect(situacaoSla({ abertoEm: abertura, prioridade: "alta" }, horasDepois(6.4))).toBe("em_risco");
  });

  test("estoura quando passa do prazo sem resolução", () => {
    expect(situacaoSla({ abertoEm: abertura, prioridade: "urgente" }, horasDepois(5))).toBe("estourado");
  });

  test("resolvido dentro do prazo conta como cumprido, mesmo consultado depois", () => {
    const chamado = { abertoEm: abertura, prioridade: "urgente" as const, resolvidoEm: horasDepois(3) };
    expect(situacaoSla(chamado, horasDepois(100))).toBe("cumprido");
  });

  test("resolvido depois do prazo conta como estourado", () => {
    const chamado = { abertoEm: abertura, prioridade: "urgente" as const, resolvidoEm: horasDepois(6) };
    expect(situacaoSla(chamado)).toBe("estourado");
  });
});
