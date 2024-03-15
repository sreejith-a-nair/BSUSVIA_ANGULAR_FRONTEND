export interface BookingRequest {
    busId: string;
    totalFare: number;
    selectedSeats: string;
    email: string;
    contact: string;
    arrivaldate: string;
    departuredate: string;
    from: string;
    to: string;
    busNumber: string;
    // userMail: string;
    passengers: Passenger[];
  }
  interface Passenger {
    name: string;
    age: number;
    gender:string;
    seatNumber : number
  }