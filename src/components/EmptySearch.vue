<template>
  <div
    class="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="max-w-md text-center">
      <HotelIcon class="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 class="mt-4 text-2xl font-bold tracking-tight text-foreground">
        Nenhum resultado encontrado
      </h3>
      <p class="mt-2 text-muted-foreground">
        Desculpe, não encontramos nenhum hotel que corresponda aos seus
        critérios de pesquisa. Por favor tente uma pesquisa diferente.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { HotelIcon } from "lucide-vue-next";
</script>
