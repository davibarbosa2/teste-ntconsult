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
        const amenities = request.queryParams.amenities as string;
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

        if (orderPrice) {
          hotels = hotels.sort((a, b) => {
            if (orderPrice === "asc") {
              return Number(a.price) - Number(b.price);
            }

            return Number(b.price) - Number(a.price);
          });
        }

        if (orderRating) {
          hotels = hotels.sort((a, b) => {
            if (orderRating === "asc") {
              return Number(a.rating) - Number(b.rating);
            }

            return Number(b.rating) - Number(a.rating);
          });
        }

        //MIRAGE aceitar apenas o ultimo valor quando a query param é passada como array (amenities=wifi&amenities=piscina...)
        const amenitiesAsArray = amenities.split(",");
        if (amenitiesAsArray.length > 0) {
          hotels = hotels.filter((hotel) =>
            amenitiesAsArray.every((amenity) =>
              hotel.amenities.some((hotelAmenity) =>
                hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
              )
            )
          );
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
