export interface Vendor {
    vendorId: number;
    vendorName: string;
    description: string;
    contactPersonName: string;
    contactEmail: string;
    contactPhone: string;
    websiteUrl: string;
    totalGoldQuantity: number;
    currentGoldPrice: number;
    createdAt: Date;
}
