<template>
  <nav class="flex items-center justify-between">
    <router-link to="/" class="text-sm font-medium transition-colors">
      <img src="@/assets/Logotipo.png" alt="Logotipo" class="h-8 w-auto" />
    </router-link>

    <div class="flex items-center gap-2">
      <Button variant="ghost" size="icon" class="rounded-full">
        <Bell />
      </Button>

      <UserDropdown />
    </div>
  </nav>
</template>

<script lang="ts" setup>
  import { Bell } from "lucide-vue-next";
  import UserDropdown from "./UserDropdown.vue";
  import Button from "./ui/button/Button.vue";
</script>
