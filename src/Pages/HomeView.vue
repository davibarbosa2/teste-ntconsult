<template>
  <div
    class="flex flex-1 justify-center flex-col gap-4 items-center w-full h-full"
  >
    <h1 class="md:text-2xl sm:text-xl lg:text-3xl">
      Pesquise o melhor hotel para você
    </h1>

    <ScrollArea class="w-full rounded-full max-w-fit">
      <div class="flex items-center justify-center h-20 p-2 gap-2 bg-white">
        <LocationInput v-model="selectedLocation" />

        <Separator class="h-3/4" orientation="vertical" />
        <div class="whitespace-nowrap">Checkin</div>
        <Separator class="h-3/4" orientation="vertical" />
        <div class="whitespace-nowrap">Check-out</div>
        <Separator class="h-3/4" orientation="vertical" />
        <div class="whitespace-nowrap">Número de quartos</div>
        <Separator class="h-3/4" orientation="vertical" />
        <div class="whitespace-nowrap">Númeor de hóspedes</div>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
  import LocationInput from "@/components/LocationInput.vue";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
  import Separator from "@/components/ui/separator/Separator.vue";
  import { ref } from "vue";

  const selectedLocation = ref("");
</script>
