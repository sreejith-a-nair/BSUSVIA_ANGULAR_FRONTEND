export interface BookingAllResponse {

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
    userMail: string;
    status:boolean;
    passengers: PassengerEntity[];
  }
  
  export interface PassengerEntity {
   
        uuid: string;
        name: string;
        age: number; 
        gender: string;
        seatNumber: number;
       
      
  }
  