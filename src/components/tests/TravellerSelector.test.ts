import { describe, it, expect } from "vitest";
import { render, RenderOptions } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import TravellerSelector from "../TravellerSelector.vue";

function setupComponent(
  component: Parameters<typeof render>[0],
  options: RenderOptions<unknown> = {}
) {
  return {
    user: userEvent.setup(),
    ...render(component, options),
  };
}

describe("TravellerSelector", () => {
  it("Se nenhum valor é passado, exibe o valor padrão de 0 viajantes e 0 quartos", () => {
    const component = setupComponent(TravellerSelector);

    expect(component.getByText(/0 Viajante\(s\), 0 quarto\(s\)/)).toBeTruthy();
  });

  it("valor emitido de viajantes aumenta em 1 quando o botão de aumentar for clicado", async () => {
    const { user, getByTestId, emitted } = setupComponent(TravellerSelector, {
      props: {
        travellers: 2,
      },
    });

    await user.click(getByTestId("popover-trigger-button"));

    const travellersField = getByTestId("travellers-number-field");

    const increaseButton = travellersField.querySelector(
      'button[aria-label="Increase"]'
    );

    if (!increaseButton) {
      throw new Error("Increase button not found");
    }

    await user.click(increaseButton);

    expect(emitted()["update:travellers"]).toHaveLength(1);
    expect(emitted()["update:travellers"][0]).toEqual([3]);
  });

  it("valor emitido de quartos aumenta em 1 quando o botão de aumentar for clicado", async () => {
    const { user, getByTestId, emitted } = setupComponent(TravellerSelector, {
      props: {
        rooms: 2,
      },
    });

    await user.click(getByTestId("popover-trigger-button"));
    const roomsField = getByTestId("rooms-number-field");
    const increaseButton = roomsField.querySelector(
      'button[aria-label="Increase"]'
    );
    if (!increaseButton) {
      throw new Error("Botão de aumentar não encontrado");
    }
    await user.click(increaseButton);
    expect(emitted()["update:rooms"]).toHaveLength(1);
    expect(emitted()["update:rooms"][0]).toEqual([3]);
  });

  it("garante a quantidade de viajantes não pode ser menor que a quantidade de quartos", async () => {
    const { user, getByTestId, emitted, rerender } = setupComponent(
      TravellerSelector,
      {
        props: {
          travellers: 2,
          rooms: 2,
        },
      }
    );

    await user.click(getByTestId("popover-trigger-button"));
    const travellersField = getByTestId("travellers-number-field");

    const decreaseTravellersButton = travellersField.querySelector(
      'button[aria-label="Decrease"]'
    );

    if (!decreaseTravellersButton) {
      throw new Error("Botão de diminuir não encontrado");
    }

    await rerender({
      rooms: 3,
    });

    expect(emitted()["update:travellers"]).toHaveLength(1);
    expect(emitted()["update:travellers"][0]).toEqual([3]);
    expect(decreaseTravellersButton.getAttributeNames()).toContain("disabled");
  });
});
