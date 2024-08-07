import { Hotel } from "@/types/hotel";
import { parseDate } from "@internationalized/date";
import { defineStore } from "pinia";
import axios from "axios";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchCriteria: {
      destination: "",
      startDate: "",
      endDate: "",
      travellers: 1,
      rooms: 1,
    },
    searchResults: [] as Hotel[],
  }),
  actions: {
    async searchHotels() {
      const query = new URLSearchParams({
        travellers: this.searchCriteria.travellers.toString(),
        rooms: this.searchCriteria.rooms.toString(),
        destination: this.searchCriteria.destination,
        startDate: this.searchCriteria.startDate,
        endDate: this.searchCriteria.endDate,
      });

      const response = await axios(`/api/hotels?${query}`);
      this.searchResults = response.data;
    },
  },

  getters: {
    parsedDates(state) {
      if (!state.searchCriteria.startDate || !state.searchCriteria.endDate) {
        return {
          start: undefined,
          end: undefined,
        };
      }

      return {
        start: parseDate(state.searchCriteria.startDate),
        end: parseDate(state.searchCriteria.endDate),
      };
    },
  },
});
