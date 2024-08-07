<template>
  <Card class="w-full">
    <Carousel class="w-full relative aspect-video rounded-t-lg">
      <CarouselContent>
        <CarouselItem v-for="(i, idx) in thumbnails" :key="idx">
          <img
            alt="Hotel Image"
            class="object-cover w-full h-full rounded-t-lg"
            :src="i"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="absolute top-1/2 left-2" />
      <CarouselNext class="absolute top-1/2 right-2" />
    </Carousel>

    <CardContent class="p-6 space-y-4">
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <h3 class="text-xl font-semibold">{{ name }}</h3>
          <p class="text-muted-foreground">{{ city }}, {{ state }}</p>

          <div class="flex items-center gap-2 flex-wrap">
            <Badge v-for="(i, idx) in amenities" :key="idx" variant="outline">
              {{ i }}
            </Badge>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <StarIcon
            v-for="i in 5"
            :key="i"
            class="w-5 h-5"
            :class="i <= rating ? 'fill-primary' : 'fill-muted'"
          />
          <span class="text-sm font-medium">{{ rating }}</span>
        </div>
      </div>
      <p class="text-muted-foreground">
        {{ description }}
      </p>

      <div class="flex justify-between items-center">
        <Button variant="default" class="">Reservar</Button>

        <div class="flex items-center space-x-2">
          <Checkbox
            :checked="checked"
            @update:checked="$emit('update:checked')"
          />
          <label class="text-sm font-medium leading-none">Comparar</label>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import { StarIcon } from "lucide-vue-next";
  import Card from "./ui/card/Card.vue";
  import CardContent from "./ui/card/CardContent.vue";
  import Button from "./ui/button/Button.vue";
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "./ui/carousel";
  import Checkbox from "./ui/checkbox/Checkbox.vue";
  import Badge from "./ui/badge/Badge.vue";
  import { PropType } from "vue";

  defineEmits(["update:checked"]);

  defineProps({
    checked: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: "Hotel Name",
    },
    rating: {
      type: Number,
      default: 4,
    },

    city: {
      type: String,
      default: "São Paulo",
    },

    state: {
      type: String,
      default: "SP",
    },

    description: {
      type: String,
      default:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem das lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem das",
    },

    amenities: {
      type: Array,
      default: () => ["wifi", "piscina", "café da manhã", "spa", "academia"],
    },

    thumbnails: {
      type: Array as PropType<Array<string>>,
      default: () => [
        "https://picsum.photos/id/123/800/600",
        "https://picsum.photos/id/124/800/600",
        "https://picsum.photos/id/125/800/600",
      ],
    },
  });
</script>
