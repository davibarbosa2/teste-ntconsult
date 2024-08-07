<template>
  <main
    class="min-h-screen h-full w-min-dvw flex flex-col p-8 bg-slate-100 gap-4"
  >
    <MainNav />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
  import MainNav from "@/components/MainNav.vue";
</script>
