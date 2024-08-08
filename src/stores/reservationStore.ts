import { ReservationInput, Reservation } from "@/types/reservation";
import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

export const useReservationStore = defineStore("reservation", {
  state: () => ({
    reservation: {} as Reservation,
  }),
  actions: {
    async createBooking(reservation: ReservationInput) {
      const { data } = await axios.post<{ reservation: Reservation }>(
        "/api/reservation",
        reservation
      );
      this.reservation = data.reservation;

      return data.reservation;
    },
  },
  getters: {
    isReservationCreated: (state) => {
      return Boolean(state.reservation.id);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReservationStore, import.meta.hot));
}
