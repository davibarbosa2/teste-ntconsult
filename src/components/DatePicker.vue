<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <div class="relative h-full">
        <Label class="absolute top-3 left-4">{{ label }}</Label>

        <Button
          variant="ghost"
          :class="
            cn(
              'w-auto h-full rounded-full pb-0 pt-6 px-4 justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )
          "
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{
            value ? df.format(value.toDate(getLocalTimeZone())) : buttonLabel
          }}
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar initial-focus v-model="value" />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
  } from "@internationalized/date";

  import { Calendar as CalendarIcon } from "lucide-vue-next";
  import { Calendar } from "@/components/ui/calendar";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { cn } from "@/lib/utils";
  import { ref } from "vue";
  import { watch } from "vue";

  const df = new DateFormatter("pt-BR", {
    dateStyle: "short",
  });

  const value = defineModel<DateValue | undefined>({
    required: true,
    type: Object as () => DateValue,
  });

  defineProps({
    buttonLabel: {
      type: String,
      default: "Selecione uma data",
    },

    label: {
      type: String,
      default: "Data",
    },
  });

  const isPopoverOpen = ref(false);

  watch(value, () => {
    isPopoverOpen.value = false;
  });
</script>
