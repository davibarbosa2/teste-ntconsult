<template>
  <div class="flex flex-col items-center justify-center gap-4 h-full flex-1">
    <template v-if="reservationStore.isReservationCreated">
      <div
        class="flex flex-col items-center justify-center gap-4 h-full flex-1"
      >
        <h1 class="text-3xl font-bold text-center">
          Reserva realizada com sucesso!
        </h1>
        <p class="text-sm text-muted-foreground">
          Sua reserva foi realizada com sucesso, o status da reserva será
          atualizado em alguns segundos.
        </p>

        <Button variant="outline" @click="router.push({ path: '/' })">
          Voltar para home
        </Button>
      </div>
    </template>

    <template v-else>
      <h1 class="text-3xl font-bold text-center">Finalize sua reserva</h1>
      <div class="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl">
        <form class="h-full" @submit="onSubmit">
          <Card class="h-full">
            <CardContent class="space-y-4 pt-6">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <FormField
                    v-slot="{ componentField }"
                    :validate-on-blur="!isFieldDirty"
                    name="name"
                  >
                    <FormItem>
                      <FormLabel for="name">Nome</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Digite seu nome"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
                <div class="space-y-2">
                  <FormField
                    v-slot="{ componentField }"
                    :validate-on-blur="!isFieldDirty"
                    name="phone"
                  >
                    <FormItem>
                      <FormLabel for="phone">Celular</FormLabel>
                      <FormControl>
                        <Input
                          v-bind="componentField"
                          id="phone"
                          v-maska="'(##) #####-####'"
                          type="tel"
                          placeholder="Digite seu celular"
                        />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </FormField>
                </div>
              </div>
              <div class="space-y-2">
                <FormField
                  v-slot="{ componentField }"
                  :validate-on-blur="!isFieldDirty"
                  name="email"
                >
                  <FormItem>
                    <FormLabel for="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <Separator />
              <div class="space-y-2">
                <FormField
                  v-slot="{ componentField }"
                  :validate-on-blur="!isFieldDirty"
                  name="cardNumber"
                >
                  <FormItem>
                    <FormLabel for="card-number">Cartão</FormLabel>
                    <FormControl>
                      <Input
                        v-bind="componentField"
                        id="card-number"
                        v-maska="'#### #### #### ####'"
                        type="text"
                        placeholder="Digite seu cartão"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div class="space-y-2">
                  <FormField
                    v-slot="{ componentField }"
                    :validate-on-blur="!isFieldDirty"
                    name="expiry"
                  >
                    <FormItem>
                      <FormLabel for="expiry">Validade</FormLabel>
                      <FormControl>
                        <Input
                          id="expiry"
                          v-maska="'##/##'"
                          type="text"
                          placeholder="MM/YY"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
                <div class="space-y-2">
                  <FormField
                    v-slot="{ componentField }"
                    :validate-on-blur="!isFieldDirty"
                    name="cvc"
                  >
                    <FormItem>
                      <FormLabel for="cvc">CVC</FormLabel>
                      <FormControl>
                        <Input
                          id="cvc"
                          v-maska="'###'"
                          type="text"
                          placeholder="CVC"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
                <div class="space-y-2">
                  <FormField
                    v-slot="{ componentField }"
                    :validate-on-blur="!isFieldDirty"
                    name="cep"
                  >
                    <FormItem>
                      <FormLabel for="cep">CEP</FormLabel>
                      <FormControl>
                        <Input
                          id="cep"
                          v-maska="'#####-###'"
                          type="text"
                          placeholder="CEP"
                          v-bind="componentField"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </div>
              </div>
              <Button type="submit" class="w-full" :disabled="isLoadingBooking">
                Reservar
                <LoaderCircle
                  v-if="isLoadingBooking"
                  class="ml-2 h-4 w-4 animate-spin"
                />
              </Button>
            </CardContent>
          </Card>
        </form>

        <div
          v-if="isLoadingHotel"
          class="flex h-full w-full items-center justify-center"
        >
          <LoaderCircle class="animate-spin" />
        </div>

        <HotelCardInfo
          v-else
          is-booking
          :amenities="hotel.amenities"
          :city="hotel.city"
          :description="hotel.description"
          :name="hotel.name"
          :price="hotel.price"
          :rating="hotel.rating"
          :thumbnails="hotel.thumbnails"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import axios from "axios";
  import { useRoute, useRouter } from "vue-router";
  import { useAsyncState } from "@vueuse/core";
  import Card from "@/components/ui/card/Card.vue";
  import CardContent from "@/components/ui/card/CardContent.vue";
  import Input from "@/components/ui/input/Input.vue";
  import Separator from "@/components/ui/separator/Separator.vue";
  import Button from "@/components/ui/button/Button.vue";
  import HotelCardInfo from "@/components/HotelCardInfo.vue";
  import { h, onMounted, ref } from "vue";
  import { Hotel } from "@/types/hotel";
  import { LoaderCircle } from "lucide-vue-next";
  import { useForm } from "vee-validate";
  import { toTypedSchema } from "@vee-validate/zod";
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import * as z from "zod";
  import { vMaska } from "maska/vue";
  import { toast } from "@/components/ui/toast";
  import ToastAction from "@/components/ui/toast/ToastAction.vue";
  import { useReservationStore } from "@/stores/reservationStore";
  import { ReservationInput } from "@/types/reservation";

  const reservationStore = useReservationStore();
  const route = useRoute();
  const router = useRouter();
  const hotel = ref<Hotel>({} as Hotel);

  onMounted(() => {
    reservationStore.$reset();
  });

  const formSchema = toTypedSchema(
    z.object({
      name: z
        .string({ required_error: "Nome obrigatório" })
        .min(1, { message: "Requerido" }),
      phone: z
        .string({ required_error: "Telefone é obrigatório" })
        .refine(
          (val) => val.replace(/[\s()-]/g, "").length === 11,
          "Telefone inválido"
        ),
      email: z
        .string({ required_error: "Email é obrigatório" })
        .email({ message: "Email inválido" }),
      cardNumber: z
        .string({ required_error: "Cartão é obrigatório" })
        .refine(
          (val) => val.replace(/\s/g, "").length === 16,
          "Cartão inválido"
        ),
      expiry: z
        .string({ required_error: "Data de validade é obrigatória" })
        .refine((val) => {
          const month = parseInt(val.split("/")[0]);
          const year = parseInt(val.split("/")[1]);

          return month > 0 && month < 13 && year >= 24 && year < 60;
        }, "Data de validade inválida"),
      cvc: z.string({ required_error: "CVC é obrigatório" }).length(3),
      cep: z
        .string({ required_error: "CEP é obrigatório" })
        .refine((val) => val.replace("-", "").length === 8, "CEP inválido"),
    })
  );

  const { handleSubmit, isFieldDirty } = useForm({
    validationSchema: formSchema,
  });

  const { isLoading: isLoadingHotel } = useAsyncState(
    axios(`/api/hotels/${route.query.hotelId}`).then((res) => res.data),
    {} as Hotel,
    {
      onSuccess(data) {
        hotel.value = data.hotel as Hotel;
      },
      onError() {
        setTimeout(() => {
          router.push({ path: "/" });
        }, 3500);

        toast({
          title: "Ops!",
          description:
            "Hotel não encontrado, você será redirecionado para a página inicial",
          variant: "destructive",
          duration: 3000,
          action: h(
            ToastAction,
            {
              altText: "Tentar novamente",
              onClick: () => {
                router.push({ path: "/" });
              },
            },
            {
              default: () => "Tentar novamente",
            }
          ),
        });
      },
    }
  );

  const { isLoading: isLoadingBooking, execute: createBooking } = useAsyncState(
    (booking: ReservationInput) => reservationStore.createBooking(booking),
    {} as ReservationInput,
    {
      immediate: false,
      onSuccess: () => {
        setTimeout(() => {
          reservationStore.$patch((state) => {
            state.reservation.status = "booked";
          });

          toast({
            title: "Reserva confirmada!",
            description:
              "Sua reserva foi confirmada, aproveite sua estadia no hotel",
            duration: 3000,
          });
        }, 3000);
      },
    }
  );

  const onSubmit = handleSubmit((values) => {
    createBooking(0, {
      guestName: values.name,
      guestEmail: values.email,
      guestPhone: values.phone,
      hotelId: route.query.hotelId?.toString() as string,
      //talvez fosse melhor colocar como parte do form (?)
      rooms: Number(route.query.rooms),
      checkInDate: route.query.startDate?.toString() as string,
      checkOutDate: route.query.endDate?.toString() as string,
    });
  });
</script>
