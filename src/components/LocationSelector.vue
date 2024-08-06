<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <div class="relative h-full min-w-36">
        <Label class="absolute top-3 left-4">Onde</Label>
        <Button
          variant="ghost"
          role="combobox"
          :class="
            cn(
              'w-full h-full rounded-full pb-0 pt-6 px-4 justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )
          "
        >
          {{ value || "Pesquise um destino" }}
        </Button>
      </div>
    </PopoverTrigger>

    <PopoverContent class="w-60" align="end">
      <Command>
        <CommandList>
          <CommandInput
            auto-focus
            placeholder="Ex: Rio de Janeiro..."
            :value="searchQuery"
            @input="searchQuery = $event.target.value"
          />

          <template v-if="isLoading">
            <div class="space-y-2 mt-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
              <Skeleton class="h-4 w-[200px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </template>

          <CommandEmpty v-else-if="error">
            Houve um erro ao buscar os resultados
          </CommandEmpty>

          <CommandEmpty v-else-if="locations.length === 0">
            Nenhum resultado encontrado
          </CommandEmpty>

          <CommandItem
            v-for="location in locations"
            v-else
            class="flex items-center gap-2"
            :key="location.id"
            :style="{ color: location.nome === value ? '#000' : '#999' }"
            :value="location.id"
            @select="onSelectLocation(location.nome)"
          >
            <MapPin class="w-5 h-5" />
            <span>{{ location.nome }} - {{ location.estado }}</span>
          </CommandItem>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Skeleton } from "@/components/ui/skeleton";
  import { MapPin } from "lucide-vue-next";
  import { useAsyncState, watchDebounced } from "@vueuse/core";
  import { ofetch } from "ofetch";

  import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { ref } from "vue";
  import { cn } from "@/lib/utils";

  interface Location {
    id: string;
    nome: string;
    estado: string;
  }

  const value = defineModel({
    default: "",
    type: String,
  });

  const emit = defineEmits(["update:modelValue"]);

  //variables
  const searchQuery = ref("");
  const isPopoverOpen = ref(false);
  const locations = ref<Array<Location>>([]);

  //composables
  const {
    execute: fetchLocations,
    error,
    isLoading,
  } = useAsyncState(
    (query: string) =>
      ofetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${query}`).then(
        (data: Array<Location>) => {
          locations.value = data;
        }
      ),
    null,
    { immediate: false }
  );

  //eveents
  const onSelectLocation = (locationName: string) => {
    emit("update:modelValue", locationName);
    searchQuery.value = "";
    isPopoverOpen.value = false;
  };

  //watchers
  watchDebounced(
    searchQuery,
    (v) => {
      if (v.length === 0) {
        locations.value = [];
        return;
      }

      if (v.length > 2) {
        fetchLocations(0, v);
      }
    },
    {
      debounce: 500,
    }
  );
</script>
