export interface BusEditRequest {
    uuid: string;
    busName: string;
    busNumber: string;
    busType: string;
    isAvailable: boolean;
    totalSeats: number;
    doubleSeatCount: number;
    thirdRowSeatCount: number;
    email:string;
    upperSeat : number;
    lowerSeat : number;
  }
  