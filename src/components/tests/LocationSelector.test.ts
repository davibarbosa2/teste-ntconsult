import { describe, it, expect, vi } from "vitest";
import { render, RenderOptions, screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import LocationSelector from "../LocationSelector.vue";
import { beforeEach } from "node:test";
import "@testing-library/jest-dom";
import { json } from "stream/consumers";

global.fetch = vi.fn();

function setupComponent(
  component: Parameters<typeof render>[0],
  options: RenderOptions<unknown> = {}
) {
  return {
    user: userEvent.setup(),
    ...render(component, options),
  };
}

describe("LocationSelection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o componente LocationSelector", () => {
    setupComponent(LocationSelector);

    //não é o melhor cenário, pois se uma tradução for adicionada, o teste não vai passar
    expect(screen.getByText("Onde")).toBeInTheDocument();
    expect(screen.getByText("Pesquise um destino")).toBeInTheDocument();
  });

  it("se um valor for seleciona, deve exibir o nome do destino na label", async () => {
    setupComponent(LocationSelector, {
      props: {
        modelValue: "São Paulo",
      },
    });

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
  });

  it("ao clicar no botão, deve exibir o popover", async () => {
    const { user } = setupComponent(LocationSelector);

    const button = screen.getByTestId("location-button");
    await user.click(button);

    expect(screen.getByTestId("location-popover")).toBeInTheDocument();
  });

  it("exibe estado de loading quando buscando locais", async () => {
    const { user } = setupComponent(LocationSelector);

    const button = screen.getByTestId("location-button");
    await user.click(button);
    const input = screen.getByTestId("location-input");

    vi.mocked(global.fetch).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve([]), 100)),
      } as Response)
    );

    await user.type(input, "São Paulo");

    await waitFor(() => {
      expect(screen.getAllByTestId("location-skeleton")).toHaveLength(4);
    });
  });

  it("exibe mensagem de erro quando ocorrer erro ao buscar locais", async () => {
    const { user } = setupComponent(LocationSelector);

    const button = screen.getByTestId("location-button");
    await user.click(button);
    const input = screen.getByTestId("location-input");

    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Erro ao buscar"));

    await user.type(input, "São Paulo");

    await waitFor(() => {
      expect(
        screen.getByText("Houve um erro ao buscar os resultados")
      ).toBeInTheDocument();
    });
  });

  it("exibe mensagem de erro quando não há locais encontrados", async () => {
    const { user } = setupComponent(LocationSelector);

    const button = screen.getByTestId("location-button");
    await user.click(button);
    const input = screen.getByTestId("location-input");
    await user.type(input, "nunca será encontrado");

    vi.mocked(global.fetch).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      } as Response)
    );
    await waitFor(() => {
      expect(
        screen.getByText("Nenhum resultado encontrado")
      ).toBeInTheDocument();
    });
  });
});
