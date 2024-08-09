<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        data-testid="popover-trigger-button"
        variant="outline"
        class="flex items-center gap-2 rounded-full"
      >
        <ArrowDownUp class="w-4 h-4" />
        <span>Filtros</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent
      class="w-auto p-4"
      align="end"
      data-testid="popover-content"
    >
      <div class="grid gap-4">
        <div class="grid gap-2">
          <h3 class="font-medium">Preço</h3>
          <div class="flex items-center gap-2">
            <ToggleGroup
              type="single"
              variant="outline"
              :model-value="orderPrice"
              @update:model-value="$emit('update:orderPrice', $event)"
            >
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="asc"
                data-testid="price-order-asc"
              >
                <ArrowUpNarrowWide />
                Crescente
              </ToggleGroupItem>

              <ToggleGroupItem
                class="flex align-center gap-2"
                value="desc"
                data-testid="price-order-desc"
              >
                <ArrowDownNarrowWide />
                Decrescente
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div class="grid gap-2">
          <h3 class="font-medium">Avaliação</h3>
          <div class="flex items-center gap-2">
            <ToggleGroup
              variant="outline"
              default-value=""
              :model-value="orderRating"
              @update:model-value="$emit('update:orderRating', $event)"
            >
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="asc"
                data-testid="rating-order-asc"
              >
                <ArrowUpNarrowWide />
                Crescente
              </ToggleGroupItem>

              <ToggleGroupItem
                class="flex align-center gap-2"
                value="desc"
                data-testid="rating-order-desc"
              >
                <ArrowDownNarrowWide />
                Decrescente
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <div class="grid gap-2">
          <h3 class="font-medium">Comodidades</h3>
          <div class="flex flex-wrap gap-2">
            <ToggleGroup
              type="multiple"
              variant="outline"
              :model-value="amenities"
              @update:model-value="$emit('update:amenities', $event)"
            >
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="wifi"
                data-testid="amenities-wifi"
              >
                <Wifi />
                Wifi
              </ToggleGroupItem>
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="piscina"
                data-testid="amenities-piscina"
              >
                <Waves />
                Piscina
              </ToggleGroupItem>
              <ToggleGroupItem
                data-testid="amenities-cafe-da-manha"
                class="flex align-center gap-2"
                value="café da manhã"
              >
                <HandPlatter />
                Café da manhã
              </ToggleGroupItem>
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="spa"
                data-testid="amenities-spa"
              >
                Spa
              </ToggleGroupItem>
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="academia"
                data-testid="amenities-academia"
              >
                <Dumbbell />
                Academia
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import {
    ArrowDownNarrowWide,
    ArrowDownUp,
    ArrowUpNarrowWide,
    Dumbbell,
    HandPlatter,
    Waves,
    Wifi,
  } from "lucide-vue-next";
  import Button from "./ui/button/Button.vue";
  import Popover from "./ui/popover/Popover.vue";
  import PopoverContent from "./ui/popover/PopoverContent.vue";
  import PopoverTrigger from "./ui/popover/PopoverTrigger.vue";
  import ToggleGroup from "./ui/toggle-group/ToggleGroup.vue";
  import ToggleGroupItem from "./ui/toggle-group/ToggleGroupItem.vue";
  import { PropType } from "vue";

  defineProps({
    amenities: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    orderPrice: {
      type: String as PropType<"asc" | "desc">,
      default: undefined,
    },
    orderRating: {
      type: String as PropType<"asc" | "desc">,
      default: undefined,
    },
  });

  defineEmits(["update:amenities", "update:orderPrice", "update:orderRating"]);
</script>
