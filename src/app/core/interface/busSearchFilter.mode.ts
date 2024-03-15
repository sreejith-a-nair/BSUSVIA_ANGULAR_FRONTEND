export interface BusSearchData {
    uuid: string;
    busName: string;
    busNumber: string;
    busType: string;
    isAvailable: boolean;
    totalSeats: number;
    availableSeats: number;
    fare: number;
    category: string;
    doubleSeatCount: number;
    thirdRowSeatCount: number;
    email: string;
    sourceLocation: string;
    destinationLocation: string;
    departureTime: string;
    arrivalTime: string;
    departureDate: Date;
    arrivalDate: Date;
    totalHour: string;
    perdayTrip: number;
}
