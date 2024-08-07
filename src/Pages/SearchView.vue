<template>
  <div class="flex flex-1 flex-col gap-4 w-full h-full">
    <div
      class="w-full flex items-center sticky top-5 z-10 bg-slate-100 rounded-full p-2"
    >
      <Button
        v-auto-animate
        class="flex items-center gap-2 rounded-full"
        variant="outline"
        :disabled="checkedHotels.length === 0"
      >
        <div
          v-if="checkedHotels.length > 0"
          class="rounded-full w-6 h-6 text-xs bg-black text-white flex items-center justify-center"
        >
          {{ checkedHotels.length }}
        </div>

        <Columns2 class="w-4 h-4" />
        <span>Comparar</span>
      </Button>

      <SearchBar class="mx-auto" />

      <HotelsFilter @apply-filters="onApplyFilters" />
    </div>

    <div class="flex-1">
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
        <HotelCardInfo
          v-for="hotel in hotels"
          :key="hotel.id"
          :name="hotel.name"
          :amenities="hotel.amenities"
          :city="hotel.city"
          :state="hotel.state"
          :description="hotel.description"
          :rating="hotel.rating"
          :checked="!!checkedHotels.find((h) => h.id === hotel.id)"
          :thumbnails="hotel.thumbnails"
          @update:checked="onCheckHotel(hotel)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HotelCardInfo from "@/components/HotelCardInfo.vue";
  import SearchBar from "@/containers/SearchBar.vue";
  import HotelsFilter from "@/components/HotelsFilter.vue";
  import type { FilterObj } from "@/components/HotelsFilter.vue";

  import { useSearchStore } from "@/stores/searchStore";
  import { useRouteQuery } from "@vueuse/router";
  import { ref, watchEffect } from "vue";
  import { Columns2 } from "lucide-vue-next";
  import Button from "@/components/ui/button/Button.vue";

  const searchStore = useSearchStore();

  const travellers = useRouteQuery("travellers", 0, { transform: Number });
  const rooms = useRouteQuery("rooms", 0, { transform: Number });
  const destination = useRouteQuery("destination", "", { transform: String });
  const startDate = useRouteQuery("startDate", "", { transform: String });
  const endDate = useRouteQuery("endDate", "", { transform: String });

  const checkedHotels = ref<Array<{ id: string; name: string }>>([]);

  const onCheckHotel = (hotel: { id: string; name: string }) => {
    const isBeind = checkedHotels.value.find((h) => h.id === hotel.id);

    if (isBeind) {
      checkedHotels.value = checkedHotels.value.filter(
        (h) => h.id !== hotel.id
      );
    } else {
      checkedHotels.value.push(hotel);
    }
  };

  const onApplyFilters = (filterObj: FilterObj) => {
    const { amenities, orderRating, orderPrice } = filterObj;

    //TODO: implementar filtros
    console.log(amenities, orderRating, orderPrice);
  };

  watchEffect(() => {
    searchStore.searchCriteria.travellers = travellers.value;
    searchStore.searchCriteria.rooms = rooms.value;
    searchStore.searchCriteria.destination = destination.value;
    searchStore.searchCriteria.startDate = startDate.value;
    searchStore.searchCriteria.endDate = endDate.value;

    if (
      travellers.value > 0 &&
      rooms.value > 0 &&
      destination.value &&
      startDate.value &&
      endDate.value
    ) {
      searchStore.searchHotels();
    }
  });

  const hotels = [
    {
      id: "1",
      name: "hotel 1",
      description: "desc 1",
      rating: 4,
      amenities: ["wifi", "piscina", "café da manhã", "spa"],
      city: "São Paulo",
      state: "SP",
      thumbnails: [
        "https://picsum.photos/id/123/800/600",
        "https://picsum.photos/id/124/800/600",
        "https://picsum.photos/id/125/800/600",
      ],
    },
    {
      id: "2",
      name: "hotel 2",
      description: "desc 2",
      rating: 2,
      amenities: ["wifi", "piscina", "café da manhã", "academia"],
      city: "Rio de Janeiro",
      state: "RJ",
      thumbnails: [
        "https://picsum.photos/id/126/800/600",
        "https://picsum.photos/id/127/800/600",
        "https://picsum.photos/id/128/800/600",
      ],
    },
    {
      id: "3",
      name: "hotel 3",
      description: "desc 3",
      rating: 1,
      amenities: ["wifi", "piscina", "café da manhã", "spa", "academia"],
      city: "Niterói",
      state: "RJ",
      thumbnails: [
        "https://picsum.photos/id/129/800/600",
        "https://picsum.photos/id/130/800/600",
        "https://picsum.photos/id/131/800/600",
      ],
    },
    {
      id: "4",
      name: "hotel 4",
      description: "desc 4",
      rating: 4,
      amenities: ["wifi", "piscina", "academia"],
      city: "Vitória",
      state: "ES",
      thumbnails: [
        "https://picsum.photos/id/132/800/600",
        "https://picsum.photos/id/133/800/600",
        "https://picsum.photos/id/134/800/600",
      ],
    },
    {
      id: "5",
      name: "hotel 5",
      description: "desc 5",
      rating: 5,
      amenities: ["café da manhã", "spa", "academia"],
      city: "Recife",
      state: "PE",
      thumbnails: [
        "https://picsum.photos/id/135/800/600",
        "https://picsum.photos/id/136/800/600",
        "https://picsum.photos/id/137/800/600",
      ],
    },
    {
      id: "6",
      name: "hotel 6",
      description: "desc 6",
      rating: 3,
      amenities: ["wifi", "piscina", "café da manhã", "spa", "academia"],
      city: "Ribeirão Preto",
      state: "SP",
      thumbnails: [
        "https://picsum.photos/id/486/800/600",
        "https://picsum.photos/id/139/800/600",
        "https://picsum.photos/id/140/800/600",
      ],
    },
  ];
</script>
