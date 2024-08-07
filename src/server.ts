import { createServer, Model } from "miragejs";
import { Hotel } from "./types/hotel";
import { generateHotels } from "./lib/utils";

const hotels: Hotel[] = generateHotels(200);

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,
    models: {
      hotel: Model,
    },

    seeds(server) {
      for (const hotel of hotels) {
        server.create("hotel", hotel);
      }
    },

    routes() {
      this.namespace = "api";

      this.get("/hotels", (schema, request) => {
        let hotels = schema.all("hotel").models as unknown as Hotel[];

        const destination = request.queryParams.destination as string;
        const rooms = request.queryParams.rooms as string;
        const amenities = request.queryParams.amenities as string[];
        const orderPrice = request.queryParams.orderPrice as "asc" | "desc";
        const orderRating = request.queryParams.orderRating as "asc" | "desc";

        if (destination) {
          hotels = hotels.filter(
            (hotel) => hotel.city.toLowerCase() === destination.toLowerCase()
          );
        }

        if (rooms) {
          hotels = hotels.filter(
            (hotel) => hotel.availableRooms >= parseInt(rooms)
          );
        }

        if (amenities?.length > 0) {
          hotels = hotels.filter((hotel) =>
            amenities.every((amenity) =>
              hotel.amenities.some((hotelAmenity) =>
                hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
              )
            )
          );
        }

        if (orderPrice) {
          hotels = hotels.sort((a, b) => {
            if (orderPrice === "asc") {
              return a.price - b.price;
            }

            return b.price - a.price;
          });
        }

        if (orderRating) {
          hotels = hotels.sort((a, b) => {
            if (orderRating === "asc") {
              return a.rating - b.rating;
            }

            return b.rating - a.rating;
          });
        }

        return hotels;
      });

      this.passthrough("http://localhost:5173/**");
      this.passthrough("https://picsum.photos/**");
      this.passthrough("https://brasilapi.com.br/**");
    },
  });

  return server;
}
