<template>
  <div
    class="flex flex-1 justify-center flex-col gap-4 items-center w-full h-full"
  >
    <h1 class="md:text-2xl sm:text-xl lg:text-3xl">
      Pesquise o melhor hotel para você
    </h1>

    <ScrollArea class="w-full rounded-full max-w-fit flex flex-col gap-4">
      <div class="flex items-center justify-center h-20 p-2 gap-2 bg-white">
        <form class="h-full" @submit="onSubmit">
          <FormField
            v-slot="{ errorMessage }"
            name="destination"
            class="h-full"
          >
            <FormItem class="h-full">
              <FormControl>
                <LocationSelector
                  :error="Boolean(errorMessage)"
                  :model-value="searchStore.searchCriteria.destination"
                  @update:model-value="setFieldValue('destination', $event)"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </form>

        <Separator class="h-3/4" orientation="vertical" />
        <DatePicker
          button-label="Check-in / Check-out"
          label="Datas da reserva"
          :model-value="searchStore.parsedDates"
          @update:model-value="onDateUpdate"
        />

        <Separator class="h-3/4" orientation="vertical" />
        <TravellerSelector
          v-model:travellers="searchStore.searchCriteria.travellers"
          v-model:rooms="searchStore.searchCriteria.rooms"
        />

        <Separator class="h-3/4" orientation="vertical" />
        <Button
          class="flex gap-2 rounded-full"
          variant="outline"
          @click="onSubmit"
        >
          <Search class="h-4 w-4" />
          Pesquisar
        </Button>
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
</template>

<script setup lang="ts">
  import DatePicker from "@/components/DatePicker.vue";
  import LocationSelector from "@/components/LocationSelector.vue";
  import TravellerSelector from "@/components/TravellerSelector.vue";
  import { Button } from "@/components/ui/button";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
  import Separator from "@/components/ui/separator/Separator.vue";
  import { useSearchStore } from "@/stores/searchStore";
  import { Search } from "lucide-vue-next";
  import { type DateRange } from "radix-vue";
  import { FormField, FormItem, FormControl } from "@/components/ui/form";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { watch } from "vue";
  import { toast } from "@/components/ui/toast";
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";

  const searchStore = useSearchStore();

  //Validação
  const formSchema = toTypedSchema(
    z.object({
      destination: z.string({
        required_error: "O destino é obrigatório",
      }),
    })
  );
  const { handleSubmit, setFieldValue, values, errors } = useForm({
    validationSchema: formSchema,
  });

  //sincroniza estados do form a store
  watch(values, (newValues) => {
    searchStore.$patch((state) => {
      state.searchCriteria.destination = newValues.destination || "";
    });
  });

  watch(errors, (newErrors) => {
    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "Ops!",
        description: "Verifique os dados digitados",
        variant: "destructive",
      });
    }
  });

  const onDateUpdate = (dateRange: DateRange | undefined) => {
    searchStore.searchCriteria.startDate = dateRange?.start?.toString() || "";
    searchStore.searchCriteria.endDate = dateRange?.end?.toString() || "";
  };

  const onSubmit = handleSubmit((values) => {
    if (
      !searchStore.searchCriteria.startDate ||
      !searchStore.searchCriteria.endDate
    ) {
      const checkinDate = today(getLocalTimeZone()).add({ days: 10 });
      const checkoutDate = today(getLocalTimeZone()).add({ days: 12 });
      const df = new DateFormatter("pt-BR", {
        dateStyle: "short",
      });

      toast({
        title: "Data de checkin e checkout automaticamente definidas",
        description: `Check-in: ${df.format(
          checkinDate.toDate(getLocalTimeZone())
        )} | Check-out: ${df.format(checkoutDate.toDate(getLocalTimeZone()))}`,
      });

      searchStore.searchCriteria.startDate = checkinDate.toString();
      searchStore.searchCriteria.endDate = checkoutDate.toString();
    }
  });
</script>
