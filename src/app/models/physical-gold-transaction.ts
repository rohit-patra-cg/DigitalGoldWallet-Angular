import { Address } from "./address";
import { User } from "./user";
import { VendorBranch } from "./vendor-branch";

export interface PhysicalGoldTransaction {
    transactionId: number;
    user: User;
    branch: VendorBranch;
    quantity: number;
    deliveryAddress: Address;
    createdAt: Date;
}
