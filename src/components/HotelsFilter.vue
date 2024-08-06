<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <Button variant="outline" class="flex items-center gap-2 rounded-full">
        <ArrowDownUp class="w-4 h-4" />
        <span>Filtros</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-auto p-4" align="end">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <h3 class="font-medium">Preço</h3>
          <div class="flex items-center gap-2">
            <ToggleGroup
              v-model="filterObj.orderPrice"
              type="single"
              variant="outline"
            >
              <ToggleGroupItem class="flex align-center gap-2" value="asc">
                <ArrowUpNarrowWide />
                Crescente
              </ToggleGroupItem>

              <ToggleGroupItem class="flex align-center gap-2" value="desc">
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
              v-model="filterObj.orderRating"
              type="single"
              variant="outline"
            >
              <ToggleGroupItem class="flex align-center gap-2" value="asc">
                <ArrowUpNarrowWide />
                Crescente
              </ToggleGroupItem>

              <ToggleGroupItem class="flex align-center gap-2" value="desc">
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
              v-model="filterObj.amenities"
              type="multiple"
              variant="outline"
            >
              <ToggleGroupItem class="flex align-center gap-2" value="wifi">
                <Wifi />
                Wifi
              </ToggleGroupItem>
              <ToggleGroupItem class="flex align-center gap-2" value="pool">
                <Waves />
                Piscina
              </ToggleGroupItem>
              <ToggleGroupItem
                class="flex align-center gap-2"
                value="breakfast"
              >
                <HandPlatter />
                Café da manhã
              </ToggleGroupItem>
              <ToggleGroupItem class="flex align-center gap-2" value="spa">
                Spa
              </ToggleGroupItem>
              <ToggleGroupItem class="flex align-center gap-2" value="gym">
                <Dumbbell />
                Academia
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div class="flex justify-end">
          <Button @click="applyFilters">
            <Check />
            Aplicar Filtros
          </Button>
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
    Check,
    Dumbbell,
    HandPlatter,
    Waves,
    Wifi,
  } from "lucide-vue-next";
  import { reactive, ref } from "vue";
  import Button from "./ui/button/Button.vue";
  import Popover from "./ui/popover/Popover.vue";
  import PopoverContent from "./ui/popover/PopoverContent.vue";
  import PopoverTrigger from "./ui/popover/PopoverTrigger.vue";
  import ToggleGroup from "./ui/toggle-group/ToggleGroup.vue";
  import ToggleGroupItem from "./ui/toggle-group/ToggleGroupItem.vue";

  export type FilterObj = {
    orderPrice: undefined | "asc" | "desc";
    orderRating: undefined | "asc" | "desc";
    amenities: string[];
  };
  const emit = defineEmits<{
    (e: "apply-filters", filterObj: FilterObj): void;
  }>();

  const isPopoverOpen = ref(false);
  const filterObj = reactive<FilterObj>({
    orderPrice: undefined,
    orderRating: undefined,
    amenities: [],
  });

  const applyFilters = () => {
    emit("apply-filters", filterObj);
    isPopoverOpen.value = false;
  };
</script>
