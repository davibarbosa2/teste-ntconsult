<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <div class="relative h-full">
        <Label class="absolute top-3 left-4">
          {{ label }}
        </Label>

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
          <template v-if="value?.start">
            <template v-if="value.end">
              {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(value.end.toDate(getLocalTimeZone())) }}
            </template>

            <template v-else>
              {{ df.format(value.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>

          <template v-else>
            {{ buttonLabel }}
          </template>
        </Button>
      </div>
    </PopoverTrigger>

    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        initial-focus
        v-model="value"
        :min-value="today(getLocalTimeZone())"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";

  import type { DateRange } from "radix-vue";

  import { Calendar as CalendarIcon } from "lucide-vue-next";
  import { RangeCalendar } from "@/components/ui/range-calendar";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { cn } from "@/lib/utils";
  import { ref } from "vue";

  const df = new DateFormatter("pt-BR", {
    dateStyle: "short",
  });

  const value = defineModel<DateRange | undefined>({
    required: true,
    type: Object as () => DateRange,
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
</script>
