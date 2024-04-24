export interface WalletResponse {
    refundBookingAmount: number;
    bookingUuid: string;
    isCashAdded: boolean;
    walletStatus: string;
    transactionDate: Date;
}