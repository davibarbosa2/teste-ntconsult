import { parseDate } from "@internationalized/date";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchCriteria: {
      destination: "",
      startDate: "",
      endDate: "",
      travellers: 1,
      rooms: 1,
    },
    searchResults: [],
  }),
  actions: {
    async searchHotels() {
      console.log("searchHotels");
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
