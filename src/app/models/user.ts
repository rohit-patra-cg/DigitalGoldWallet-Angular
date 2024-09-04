import { Address } from "./address";

export interface User {
    userId: number;
    name: string;
    email: string;
    address: Address;
    balance: number;
    createdAt: Date;
}