import { describe, it, expect } from "vitest";
import { render, RenderOptions } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import HotelsFilter from "../HotelsFilter.vue";
import "@testing-library/jest-dom";

function setupComponent(
  component: Parameters<typeof render>[0],
  options: RenderOptions<unknown> = {}
) {
  return {
    user: userEvent.setup(),
    ...render(component, options),
  };
}

describe("HotelsFilter", () => {
  it("renderiza o componente corretamente", () => {
    const { getByTestId } = setupComponent(HotelsFilter);
    expect(getByTestId("popover-trigger-button")).toBeTruthy();
  });

  it("abre o popover quando o filtros é clicado", async () => {
    const { user, getByTestId } = setupComponent(HotelsFilter);

    await user.click(getByTestId("popover-trigger-button"));

    expect(getByTestId("popover-content")).toBeTruthy();
  });

  it("emite eventos corretos ao clicar nas opções de filtro", async () => {
    const { user, emitted, getByTestId } = setupComponent(HotelsFilter);
    await user.click(getByTestId("popover-trigger-button"));
    const priceOrder = getByTestId("price-order-desc");
    const ratingOrder = getByTestId("rating-order-asc");
    const amenitiesWifi = getByTestId("amenities-wifi");
    const amenitiesPiscina = getByTestId("amenities-piscina");
    const amenitiesCafeDaManha = getByTestId("amenities-cafe-da-manha");
    const amenitiesSpa = getByTestId("amenities-spa");
    const amenitiesAcademia = getByTestId("amenities-academia");

    await user.click(priceOrder);
    await user.click(ratingOrder);
    await user.click(amenitiesWifi);
    await user.click(amenitiesPiscina);
    await user.click(amenitiesCafeDaManha);
    await user.click(amenitiesSpa);
    await user.click(amenitiesAcademia);

    expect(emitted()["update:orderPrice"]).toBeTruthy();
    expect(emitted()["update:orderRating"]).toBeTruthy();
    expect(emitted()["update:amenities"]).toBeTruthy();
  });

  it("valores corretos são mostrados ao iniciar o filtro com valores definidos", async () => {
    const { getByTestId, user } = setupComponent(HotelsFilter, {
      props: {
        orderPrice: "desc",
        orderRating: "asc",
        amenities: ["wifi", "academia"],
      },
    });

    await user.click(getByTestId("popover-trigger-button"));

    const priceOrder = getByTestId("price-order-desc");
    const ratingOrder = getByTestId("rating-order-asc");
    const amenitiesWifi = getByTestId("amenities-wifi");
    const amenitiesAcademia = getByTestId("amenities-academia");

    expect(priceOrder).toHaveAttribute("data-state", "on");
    expect(ratingOrder).toHaveAttribute("data-state", "on");
    expect(amenitiesWifi).toHaveAttribute("data-state", "on");
    expect(amenitiesAcademia).toHaveAttribute("data-state", "on");
  });
});
