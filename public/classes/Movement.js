export class Movement {
    constructor(friend, details, amount) {
        this.friend = friend;
        this.details = details;
        this.amount = amount;
    }
    printDetail() {
        return `${this.friend} bought ${this.details} for $${this.amount}`;
    }
}
