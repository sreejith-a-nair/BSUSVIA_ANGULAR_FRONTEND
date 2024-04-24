import { RootType } from "src/app/bus-operator/components/enum/rootType.enum";

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
    rootType: string; 
    }
  