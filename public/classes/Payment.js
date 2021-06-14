export class Payment {
    constructor(friend, details, amount) {
        this.friend = friend;
        this.details = details;
        this.amount = amount;
    }
    printDetail() {
        return `${this.friend} returns $${this.amount} for ${this.details}`;
    }
}
