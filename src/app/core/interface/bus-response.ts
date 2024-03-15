export interface BusResponse {
    user: any;
    uuid: string;
    busName: string;
    busNumber: string;
    busType: string;
    isAvailable: boolean;
    totalSeats: number;
    availableSeats : number;
    fare : number;
    category:string;
    doubleSeatCount: number;
    thirdRowSeatCount: number;
    upperSeat : number;
    lowerSeat : number;
    email:string
  }
  