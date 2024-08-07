<template>
  <div class="flex flex-1 flex-col gap-4 w-full h-full">
    <div
      class="w-full flex items-center sticky top-5 z-10 bg-slate-100 rounded-full p-2"
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

        <DialogContent class="w-[90vw] max-w-[1200px]">
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

      <HotelsFilter @apply-filters="onApplyFilters" />
    </div>

    <div class="flex-1">
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-6">
        <HotelCardInfo
          v-for="hotel in searchStore.searchResults"
          :key="hotel.id"
          :name="hotel.name"
          :amenities="hotel.amenities"
          :city="hotel.city"
          :state="hotel.state"
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
  import HotelCardInfo from "@/components/HotelCardInfo.vue";
  import type { FilterObj } from "@/components/HotelsFilter.vue";
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
  import { useRouteQuery } from "@vueuse/router";
  import { Columns2 } from "lucide-vue-next";
  import { ref, watch, watchEffect, h } from "vue";

  const searchStore = useSearchStore();

  const travellersQuery = useRouteQuery("travellers", 0, { transform: Number });
  const roomsQuery = useRouteQuery("rooms", 0, { transform: Number });
  const destinationQuery = useRouteQuery("destination", "", {
    transform: String,
  });
  const startDateQuery = useRouteQuery("startDate", "", { transform: String });
  const endDateQuery = useRouteQuery("endDate", "", { transform: String });

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

  const onApplyFilters = (filterObj: FilterObj) => {
    const { amenities, orderRating, orderPrice } = filterObj;

    //TODO: implementar filtros
    console.log(amenities, orderRating, orderPrice);
  };

  const onBookHotel = (hotel: Hotel) => {
    console.log(hotel);
  };

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

  watchEffect(() => {
    searchStore.searchCriteria.travellers = travellersQuery.value;
    searchStore.searchCriteria.rooms = roomsQuery.value;
    searchStore.searchCriteria.destination = destinationQuery.value;
    searchStore.searchCriteria.startDate = startDateQuery.value;
    searchStore.searchCriteria.endDate = endDateQuery.value;

    if (
      travellersQuery.value > 0 &&
      roomsQuery.value > 0 &&
      destinationQuery.value &&
      startDateQuery.value &&
      endDateQuery.value
    ) {
      searchStore.searchHotels();
    }
  });
</script>
