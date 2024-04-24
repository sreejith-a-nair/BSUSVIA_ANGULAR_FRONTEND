export interface CouponInfo {
    uuid:string;
    couponName: string;
    couponCode: string;
    expiryDate: string;
    count: number;
    maxPrice: number;
    offPercent: number;
    minFare:number;
    enabled: boolean;
}