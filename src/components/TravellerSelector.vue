<template>
  <Popover v-model:open="isPopoverOpen">
    <PopoverTrigger as-child>
      <div class="relative h-full">
        <Label class="absolute top-3 left-4">Viajantes</Label>
        <Button
          variant="ghost"
          :class="
            cn(
              'flex gap-1 items-center w-auto h-full rounded-full pb-0 pt-6 px-4 justify-start text-left font-normal',
              (!travellers || !rooms) && 'text-muted-foreground'
            )
          "
        >
          <User class="h-4 w-4" />
          {{ travellers }} Viajante(s), {{ rooms }} quarto(s)
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent>
      <div class="flex gap-2">
        <NumberField
          id="travellers"
          :min="1"
          :max="10"
          :model-value="travellers"
          @update:model-value="$emit('update:travellers', $event)"
        >
          <Label for="travellers">Viajantes</Label>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <NumberField
          id="rooms"
          :min="1"
          :max="10"
          :model-value="rooms"
          @update:model-value="$emit('update:rooms', $event)"
        >
          <Label for="travellers">Quartos</Label>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "@/components/ui/number-field";

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import Button from "@/components/ui/button/Button.vue";

  import { cn } from "@/lib/utils";
  import { User } from "lucide-vue-next";
  import Label from "@/components/ui/label/Label.vue";
  import { ref } from "vue";

  defineModel("travellers", {
    default: 0,
    type: Number,
  });
  defineModel("rooms", {
    default: 0,
    type: Number,
  });

  const isPopoverOpen = ref(false);
</script>
