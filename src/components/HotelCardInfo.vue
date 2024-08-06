<script setup lang="ts">
  import { StarIcon } from "lucide-vue-next";
  import Card from "./ui/card/Card.vue";
  import CardContent from "./ui/card/CardContent.vue";
  import Checkbox from "./ui/checkbox/Checkbox.vue";
  import Button from "./ui/button/Button.vue";
</script>

<template>
  <Card class="w-full rounded-lg overflow-hidden shadow-lg">
    <img
      src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      alt="Hotel Image"
      width="600"
      height="400"
      class="w-full h-48 object-cover"
      :style="{ aspectRatio: '600/400', objectFit: 'cover' }"
    />
    <CardContent class="p-6 bg-background">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold">The Ritz-Carlton</h3>
        <div class="flex items-center gap-1 text-primary">
          <StarIcon class="w-5 h-5" />
          <StarIcon class="w-5 h-5" />
          <StarIcon class="w-5 h-5" />
          <StarIcon class="w-5 h-5" />
          <StarIcon class="w-5 h-5 text-muted-foreground" />
          <span class="text-sm font-medium">4.5</span>
        </div>
      </div>
      <p class="text-muted-foreground mb-4">
        Luxurious beachfront resort with world-class amenities and impeccable
        service.
      </p>
      <div
        class="flex items-center justify-between text-sm text-muted-foreground"
      >
        <span>250 rooms</span>
        <span>Avg. nightly rate: $500</span>
      </div>
      <div class="flex items-center justify-between mt-4">
        <Checkbox></Checkbox>
        <Button>Book Room</Button>
      </div>
    </CardContent>
  </Card>
</template>
