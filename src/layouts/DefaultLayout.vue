<template>
  <main
    class="min-h-screen h-full w-min-dvw flex flex-col p-8 bg-slate-100 gap-4"
  >
    <MainNav />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
  import MainNav from "@/components/MainNav.vue";
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
