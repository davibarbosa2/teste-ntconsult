<template>
  <div class="flex flex-1 flex-col gap-4 w-full h-full">
    <div class="w-full flex items-center">
      <SearchBar class="mx-auto" />

      <HotelsFilter @apply-filters="onApplyFilters" />
    </div>

    <div class="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <HotelCardInfo v-for="hotel in 3" :key="hotel" />
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
  import { watchEffect } from "vue";

  const searchStore = useSearchStore();

  const travellers = useRouteQuery("travellers", 0, { transform: Number });
  const rooms = useRouteQuery("rooms", 0, { transform: Number });
  const destination = useRouteQuery("destination", "", { transform: String });
  const startDate = useRouteQuery("startDate", "", { transform: String });
  const endDate = useRouteQuery("endDate", "", { transform: String });

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
</script>
