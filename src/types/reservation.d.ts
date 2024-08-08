export interface ReservationInput {
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface Reservation extends ReservationInput {
  id: string;
  status: "pending" | "booked";
}
