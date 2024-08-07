export interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  amenities: string[];
  city: string;
  state: string;
  thumbnails: string[];
  availableRooms: number;
}
