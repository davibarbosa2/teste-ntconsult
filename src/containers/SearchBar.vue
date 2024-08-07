<template>
  <ScrollArea class="w-full rounded-full max-w-fit flex flex-col gap-4">
    <div class="flex items-center justify-center h-16 p-2 gap-2 bg-white">
      <form class="h-full" @submit="onSubmit">
        <FormField v-slot="{ errorMessage }" name="destination" class="h-full">
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
</template>

<script setup lang="ts">
  import DatePicker from "@/components/DatePicker.vue";
  import LocationSelector from "@/components/LocationSelector.vue";
  import TravellerSelector from "@/components/TravellerSelector.vue";
  import { Button } from "@/components/ui/button";
  import { FormControl, FormField, FormItem } from "@/components/ui/form";
  import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
  import Separator from "@/components/ui/separator/Separator.vue";
  import { toast } from "@/components/ui/toast";
  import { useSearchStore } from "@/stores/searchStore";
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import { toTypedSchema } from "@vee-validate/zod";
  import { Search } from "lucide-vue-next";
  import { type DateRange } from "radix-vue";
  import { useForm } from "vee-validate";
  import { watch } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import * as z from "zod";

  const router = useRouter();
  const route = useRoute();
  const searchStore = useSearchStore();

  //Validação
  const formSchema = toTypedSchema(
    z.object({
      destination: z
        .string({
          required_error: "O destino é obrigatório",
        })
        .trim()
        .min(1),
    })
  );
  const { handleSubmit, setFieldValue, values, errors } = useForm({
    validationSchema: formSchema,
    initialValues: {
      destination: searchStore.searchCriteria.destination,
    },
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
        description: "Verifique os dados de pesquisa",
        variant: "destructive",
      });
    }
  });

  const onDateUpdate = (dateRange: DateRange | undefined) => {
    searchStore.searchCriteria.startDate = dateRange?.start?.toString() || "";
    searchStore.searchCriteria.endDate = dateRange?.end?.toString() || "";
  };

  const onSubmit = handleSubmit(() => {
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

    router.push({
      name: "search",
      query: {
        ...route.query,
        travellers: searchStore.searchCriteria.travellers,
        rooms: searchStore.searchCriteria.rooms,
        destination: searchStore.searchCriteria.destination,
        startDate: searchStore.searchCriteria.startDate,
        endDate: searchStore.searchCriteria.endDate,
      },
    });
  });
</script>
