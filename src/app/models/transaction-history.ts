import { User } from "./user";
import { VendorBranch } from "./vendor-branch";

export interface TransactionHistory {
    transactionId: number;
    user: User;
    branch: VendorBranch;
    transactionType: string;
    transactionStatus: string;
    quantity: number;
    amount: number;
    createdAt: Date;
}
