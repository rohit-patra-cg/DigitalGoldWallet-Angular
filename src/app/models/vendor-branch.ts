import { Address } from "./address";
import { Vendor } from "./vendor";

export interface VendorBranch {
    branchId: number;
    vendor: Vendor;
    address: Address;
    quantity: number;
    createdAt: Date;
}
