<template>
  <div
    class="flex flex-1 justify-center flex-col gap-4 items-center w-full h-full"
  >
    <h1 class="md:text-2xl sm:text-xl lg:text-3xl">
      Pesquise o melhor hotel para você
    </h1>

    <ScrollArea class="w-full rounded-full max-w-fit flex flex-col gap-4">
      <div class="flex items-center justify-center h-20 p-2 gap-2 bg-white">
        <LocationSelector v-model="selectedLocation" />

        <Separator class="h-3/4" orientation="vertical" />
        <DatePicker
          button-label="Check-in / Check-out"
          label="Datas da reserva"
          v-model="starEndDate"
        />

        <Separator class="h-3/4" orientation="vertical" />
        <TravellerSelector
          v-model:travellers="travellers"
          v-model:rooms="rooms"
        />

        <Separator class="h-3/4" orientation="vertical" />
        <Button
          class="flex gap-2 rounded-full"
          variant="outline"
          @click="() => {}"
        >
          <Search class="h-4 w-4" />
          Pesquisar
        </Button>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
  import DatePicker from "@/components/DatePicker.vue";
  import LocationSelector from "@/components/LocationSelector.vue";
  import TravellerSelector from "@/components/TravellerSelector.vue";
  import { Button } from "@/components/ui/button";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
  import Separator from "@/components/ui/separator/Separator.vue";
  import type { DateRange } from "radix-vue";
  import { Search } from "lucide-vue-next";
  import { ref } from "vue";

  const selectedLocation = ref("");
  const starEndDate = ref<DateRange>();
  const travellers = ref(1);
  const rooms = ref(1);
</script>
