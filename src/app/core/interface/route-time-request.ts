  export interface RouteTimeDataRequest {
    uuid?: string;
    sourceLocation: string;
    destinationLocation: string;
    departureTime: String; 
    arrivalTime: String;   
    departureDate: Date;
    arrivalDate: Date;
    totalHour: string;
    perdayTrip: number;
      
    }
  