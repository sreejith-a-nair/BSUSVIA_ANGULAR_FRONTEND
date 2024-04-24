export interface UpdateWalletAfterBookingRequest {
    totalFare: number;
    email: string;
    bookingId: string;
    bookingDate :Date;
    status:string;
  }