<template>
  <div
    class="flex flex-1 justify-center flex-col gap-4 items-center w-full h-full"
  >
    <h1 class="md:text-2xl sm:text-xl lg:text-3xl">
      Pesquise o melhor hotel para você
    </h1>

    <SearchBar />
  </div>
</template>

<script setup lang="ts">
  import SearchBar from "@/containers/SearchBar.vue";
</script>
