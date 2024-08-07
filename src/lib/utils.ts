import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { faker } from "@faker-js/faker/locale/pt_BR";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(price);
}

export function generateHotels(count = 50) {
  const amenities = ["wifi", "piscina", "café da manhã", "spa", "academia"];
  // o faker não gera cidades brasileiras reais
  const mainCities = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Brasília",
    "Fortaleza",
    "Recife",
    "Porto Alegre",
    "Curitiba",
    "Belo Horizonte",
    "Recife",
    "Porto Alegre",
    "Curitiba",
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    name:
      faker.company.name() +
      " " +
      faker.word.adjective({ strategy: "any-length" }) +
      " Hotel",
    description: faker.lorem.paragraph(),
    rating: faker.number.int({ min: 1, max: 5 }),
    price: parseFloat(faker.commerce.price({ min: 100, max: 2000, dec: 2 })),
    amenities: faker.helpers.arrayElements(amenities, { min: 3, max: 8 }),
    city: faker.helpers.arrayElement(mainCities),
    state: faker.location.state({ abbreviated: true }),
    thumbnails: [
      faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
      faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
      faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
    ],
    availableRooms: faker.number.int({ min: 0, max: 50 }),
  }));
}
