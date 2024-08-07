import { Hotel } from "@/types/hotel";
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
    searchResults: [
      {
        id: "1",
        name: "hotel 1",
        description: "desc 1",
        rating: 4,
        price: 257.6,
        amenities: ["wifi", "piscina", "café da manhã", "spa"],
        city: "São Paulo",
        state: "SP",
        thumbnails: [
          "https://picsum.photos/id/123/800/600teste-error",
          "https://picsum.photos/id/124/800/600",
          "https://picsum.photos/id/125/800/600",
        ],
      },
      {
        id: "2",
        name: "hotel 2",
        description: "desc 2",
        rating: 2,
        price: 165.4,
        amenities: ["wifi", "piscina", "café da manhã", "academia"],
        city: "Rio de Janeiro",
        state: "RJ",
        thumbnails: [
          "https://picsum.photos/id/126/800/600",
          "https://picsum.photos/id/127/800/600",
          "https://picsum.photos/id/128/800/600",
        ],
      },
      {
        id: "3",
        name: "hotel 3",
        description: "desc 3",
        rating: 1,
        price: 120.5,
        amenities: ["wifi", "piscina", "café da manhã", "spa", "academia"],
        city: "Niterói",
        state: "RJ",
        thumbnails: [
          "https://picsum.photos/id/129/800/600",
          "https://picsum.photos/id/130/800/600",
          "https://picsum.photos/id/131/800/600",
        ],
      },
      {
        id: "4",
        name: "hotel 4",
        description: "desc 4",
        rating: 4,
        price: 120.5,
        amenities: ["wifi", "piscina", "academia"],
        city: "Vitória",
        state: "ES",
        thumbnails: [
          "https://picsum.photos/id/132/800/600",
          "https://picsum.photos/id/133/800/600",
          "https://picsum.photos/id/134/800/600",
        ],
      },
      {
        id: "5",
        name: "hotel 5",
        description: "desc 5",
        rating: 5,
        price: 120.5,
        amenities: ["café da manhã", "spa", "academia"],
        city: "Recife",
        state: "PE",
        thumbnails: [
          "https://picsum.photos/id/135/800/600",
          "https://picsum.photos/id/136/800/600",
          "https://picsum.photos/id/137/800/600",
        ],
      },
      {
        id: "6",
        name: "hotel 6",
        description: "desc 6",
        rating: 3,
        price: 107.78,
        amenities: ["wifi", "piscina", "café da manhã", "spa", "academia"],
        city: "Ribeirão Preto",
        state: "SP",
        thumbnails: [
          "https://picsum.photos/id/486/800/600",
          "https://picsum.photos/id/139/800/600",
          "https://picsum.photos/id/140/800/600",
        ],
      },
    ] as Hotel[],
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
