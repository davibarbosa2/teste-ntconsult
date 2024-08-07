<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="header in headers" :key="header">
          {{ header }}
        </TableHead>

        <TableHead>
          <span class="sr-only">Reservar</span>
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="hotel in hotels" :key="hotel.id">
        <TableCell>
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 flex-shrink-0">
              <UseImage
                :src="hotel.thumbnails[0]"
                alt="Hotel Image"
                class="rounded-lg w-full h-full"
              >
                <template #loading>
                  <div class="flex h-full w-full items-center justify-center">
                    <LoaderCircle class="animate-spin" />
                  </div>
                </template>

                <template #error>
                  <div class="flex h-full w-full items-center justify-center">
                    <ImageOff />
                  </div>
                </template>
              </UseImage>
            </div>
            <div>
              <div class="font-medium">{{ hotel.name }}</div>
              <div class="text-sm text-muted-foreground">
                {{ hotel.description }}
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell>{{ hotel.city }}</TableCell>

        <TableCell>{{ formatPrice(hotel.price) }} / noite</TableCell>

        <TableCell>
          <div class="flex items-center gap-1">
            <StarIcon
              v-for="i in 5"
              :key="i"
              class="w-5 h-5"
              :class="i <= hotel.rating ? 'fill-primary' : 'fill-muted'"
            />
          </div>
        </TableCell>

        <TableCell>
          <ul class="space-y-1 text-sm">
            <li v-for="amenity in hotel.amenities" :key="amenity">
              {{ amenity }}
            </li>
          </ul>
        </TableCell>

        <TableCell>
          <Button @click="$emit('book-hotel', hotel)">Reservar</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<script setup lang="ts">
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { ImageOff, LoaderCircle, StarIcon } from "lucide-vue-next";

  import { formatPrice } from "@/lib/utils";
  import { Hotel } from "@/types/hotel";
  import { UseImage } from "@vueuse/components";
  import { PropType } from "vue";
  import Button from "./ui/button/Button.vue";

  const headers = ["Nome", "Localidade", "Preço", "Avaliação", "Comodidades"];

  defineEmits<{
    (e: "book-hotel", hotel: Hotel): void;
  }>();

  defineProps({
    hotels: {
      type: Array as PropType<Hotel[]>,
      default: () => [],
    },
  });
</script>
