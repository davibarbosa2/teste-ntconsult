// eslint-disable-next-line
//@ts-nocheck
import { createServer, Model, Response } from "miragejs";
import { generateHotels } from "./lib/utils";

const hotels = generateHotels(200);

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,
    models: {
      hotel: Model,
      reservation: Model,
    },

    seeds(server) {
      for (const hotel of hotels) {
        server.create("hotel", hotel);
      }
    },

    routes() {
      this.namespace = "api";

      this.get("/hotels", (schema, request) => {
        let hotels = schema.hotels.all().models;

        const destination = request.queryParams.destination;
        const rooms = request.queryParams.rooms;
        const amenities = request.queryParams.amenities;
        const orderPrice = request.queryParams.orderPrice;
        const orderRating = request.queryParams.orderRating;

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

        //MIRAGE aceita apenas o ultimo valor quando a query param é passada como array (amenities=wifi&amenities=piscina...)
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

      this.get("/hotels/:id", (schema, request) => {
        const id = request.params.id;

        const hotel = schema.findBy("hotel", { id });

        if (hotel) {
          return hotel;
        } else {
          return new Response(404, {}, { error: "Hotel não encontrado" });
        }
      });

      //cria uma reserva
      this.post("/reservation", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        return schema.reservations.create({
          ...data,
          id: Date.now().toString(),
          status: "pending",
        });
      });

      this.passthrough("http://localhost:5173/**");
      this.passthrough("https://picsum.photos/**");
      this.passthrough("https://brasilapi.com.br/**");
    },
  });

  return server;
}
