export interface BookingResponse {
    uuid: string;
    totalFare: number;
    selectedSeats: number;
    email: string;
    contact: string;
    arrivaldate: string;
    departuredate: string;
    fromLocations: string;
    toLocations: string;
    busNumber: string;
    busId: string;
    passengers: Passenger[];
  }
  
  interface Passenger {
    uuid: string;
    name: string;
    age: number;
    gender: string;
    seatNumber: number;
  }
  