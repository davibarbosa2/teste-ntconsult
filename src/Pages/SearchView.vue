<template>
  <div class="flex flex-1 flex-col gap-4 w-full h-full">
    <div
      class="w-full flex items-center sticky top-5 z-10 bg-slate-100 rounded-full p-2 gap-4"
    >
      <Dialog v-model:open="isComparsionTableOpen">
        <DialogTrigger as-child>
          <Button
            v-auto-animate
            class="flex items-center gap-2 rounded-full"
            variant="outline"
            :disabled="checkedHotels.length <= 1"
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
        </DialogTrigger>

        <DialogContent class="w-[90vw] max-w-[1500px]">
          <div class="flex flex-col h-full">
            <DialogHeader class="border-b pb-2">
              <DialogTitle class="text-2xl font-bold">
                Comparar hotéis
              </DialogTitle>

              <DialogDescription class="text-sm text-muted-foreground">
                Compare hotéis e escolha o que melhor para sua estadia
              </DialogDescription>
            </DialogHeader>
            <div class="flex-1 overflow-auto max-h-[calc(100vh-200px)]">
              <ComparsionTable
                :hotels="checkedHotels"
                @book-hotel="onBookHotel"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SearchBar class="mx-auto" />

      <HotelsFilter
        v-model:orderPrice="orderPriceQuery"
        v-model:orderRating="orderRatingQuery"
        v-model:amenities="amenitiesQuery"
      />
    </div>

    <div
      v-if="isSearching"
      class="flex-1 flex h-full w-full items-center justify-center"
    >
      <LoaderCircle class="animate-spin" />
    </div>

    <div
      v-else-if="searchError"
      class="flex-1 flex h-full w-full items-center justify-center"
    >
      <div class="flex flex-col gap-4 items-center justify-center">
        <h1 class="text-2xl font-bold">Ops!</h1>
        <p class="text-sm text-muted-foreground">
          Houve um erro ao buscar os resultados
        </p>
      </div>
    </div>

    <div
      v-else-if="!searchStore.searchResults.length"
      class="flex-1 flex h-full w-full items-center justify-center"
    >
      <EmptySearch />
    </div>

    <div v-else class="flex-1">
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
        <HotelCardInfo
          v-for="hotel in searchStore.searchResults"
          :key="hotel.id"
          :name="hotel.name"
          :amenities="hotel.amenities"
          :city="hotel.city"
          :description="hotel.description"
          :rating="hotel.rating"
          :checked="!!checkedHotels.find((h) => h.id === hotel.id)"
          :thumbnails="hotel.thumbnails"
          :price="hotel.price"
          @update:checked="onCheckHotel(hotel)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ComparsionTable from "@/components/ComparsionTable.vue";
  import EmptySearch from "@/components/EmptySearch.vue";
  import HotelCardInfo from "@/components/HotelCardInfo.vue";
  import HotelsFilter from "@/components/HotelsFilter.vue";
  import Button from "@/components/ui/button/Button.vue";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import DialogDescription from "@/components/ui/dialog/DialogDescription.vue";
  import { toast } from "@/components/ui/toast";
  import ToastAction from "@/components/ui/toast/ToastAction.vue";
  import SearchBar from "@/containers/SearchBar.vue";
  import { useSearchStore } from "@/stores/searchStore";
  import { Hotel } from "@/types/hotel";
  import { useAsyncState } from "@vueuse/core";
  import { useRouteQuery } from "@vueuse/router";
  import { Columns2, LoaderCircle } from "lucide-vue-next";
  import { h, ref, watch } from "vue";

  const searchStore = useSearchStore();
  const {
    execute: searchHotels,
    isLoading: isSearching,
    error: searchError,
  } = useAsyncState(searchStore.searchHotels, null, {
    immediate: false,
    onError: () => {
      toast({
        title: "Ops!",
        description:
          "Houve um erro ao buscar os resultados, tente mudar os parâmetros",
        variant: "destructive",
        action: h(
          ToastAction,
          {
            altText: "Tentar novamente",
            onClick: () => {
              searchHotels();
              checkedHotels.value = [];
            },
          },
          {
            default: () => "Tentar novamente",
          }
        ),
      });
    },
  });

  const travellersQuery = useRouteQuery("travellers", 1, { transform: Number });
  const roomsQuery = useRouteQuery("rooms", 1, { transform: Number });
  const destinationQuery = useRouteQuery("destination", "", {
    transform: String,
  });
  const startDateQuery = useRouteQuery("startDate", "", { transform: String });
  const endDateQuery = useRouteQuery("endDate", "", { transform: String });

  const orderPriceQuery = useRouteQuery<"asc" | "desc">("orderPrice", "asc");
  const orderRatingQuery = useRouteQuery<"asc" | "desc">("orderRating", "desc");

  const amenitiesQuery = useRouteQuery("amenities", [], {
    transform: (value: string[]) => value.map((v) => v.toLowerCase()),
  });

  const checkedHotels = ref<Hotel[]>([]);
  const isComparsionTableOpen = ref(false);

  const onCheckHotel = (hotel: Hotel) => {
    const index = checkedHotels.value.findIndex((h) => h.id === hotel.id);

    if (index !== -1) {
      checkedHotels.value.splice(index, 1);
    } else if (checkedHotels.value.length < 5) {
      checkedHotels.value.push(hotel);
    } else {
      toast({
        title: "Você já selecionou o máximo de 5 hotéis para comparar",
        duration: 1500,
        action: h(
          ToastAction,
          {
            altText: "Comparar hotéis",
            onClick: () => {
              isComparsionTableOpen.value = true;
            },
          },
          {
            default: () => "Comparar",
          }
        ),
      });
    }
  };

  const onBookHotel = (hotel: Hotel) => {
    console.log(hotel);
  };

  watch(
    [
      travellersQuery,
      roomsQuery,
      destinationQuery,
      startDateQuery,
      endDateQuery,
      orderPriceQuery,
      orderRatingQuery,
      amenitiesQuery,
    ],
    ([
      travellers,
      rooms,
      destination,
      startDate,
      endDate,
      orderPrice,
      orderRating,
      amenities,
    ]) => {
      // Atualiza a store com os valores dos query params
      searchStore.searchCriteria.travellers = travellers;
      searchStore.searchCriteria.rooms = rooms;
      searchStore.searchCriteria.destination = destination;
      searchStore.searchCriteria.startDate = startDate;
      searchStore.searchCriteria.endDate = endDate;
      searchStore.searchCriteria.orderPrice = orderPrice;
      searchStore.searchCriteria.orderRating = orderRating;
      searchStore.searchCriteria.amenities = amenities;

      //se todos os query params estiverem preenchidos, busca os resultados
      if (travellers > 0 && rooms > 0 && destination && startDate && endDate) {
        searchHotels();
        checkedHotels.value = [];
      }
    },
    { immediate: true }
  );

  watch(
    checkedHotels,
    (newValue) => {
      if (newValue.length == 1) {
        toast({
          title: "Selecione mais um hotel para comparar",
          duration: 1000,
        });
      }
    },
    { deep: true }
  );
</script>
