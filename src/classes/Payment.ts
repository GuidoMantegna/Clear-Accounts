import { MovementFormatter } from "../interfaces/MovementFormatter";

export class Payment implements MovementFormatter{
    constructor(
        public friend: string,
        public details: string,
        public amount: number
    ) {}

    printDetail() {
        return `${this.friend} returns $${this.amount} for ${this.details}`
    }
}