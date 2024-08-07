export interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  amenities: string[];
  city: string;
  thumbnails: string[];
  availableRooms: number;
}
