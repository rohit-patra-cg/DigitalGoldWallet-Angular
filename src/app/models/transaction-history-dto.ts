export interface TransactionHistoryDTO {
    userId: number;
    branchId: number;
    transactionType: string;
    transactionStatus: string;
    quantity: number;
    amount: number;
}
