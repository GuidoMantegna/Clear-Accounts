import { MovementFormatter } from "../interfaces/MovementFormatter"

export class Buyings implements MovementFormatter{
    constructor(
        public friend: string,
        public details: string,
        public amount: number
    ) {}

    printDetail() {
        return `${this.friend} bought ${this.details} for $${this.amount}`
    }
}