<template>
  <nav class="flex items-center justify-between">
    <router-link to="/" class="text-sm font-medium transition-colors">
      <img src="@/assets/Logotipo.png" alt="Logotipo" class="h-8 w-auto" />
    </router-link>

    <UserDropdown />
  </nav>
</template>

<script lang="ts" setup>
  import UserDropdown from "./UserDropdown.vue";
</script>
