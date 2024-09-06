import { User } from "./user";
import { VendorBranch } from "./vendor-branch";

export interface VirtualGoldHolding {
    holdingId: number;
    user: User;
    branch: VendorBranch;
    quantity: number;
    createdAt: Date;
}
