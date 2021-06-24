export class Users {
    constructor(name, debe = 0, leDeben = 0, contribution = []) {
        this.name = name;
        this.debe = debe;
        this.leDeben = leDeben;
        this.contribution = contribution;
    }
    totalContribution() {
        let totalContribution = 0;
        this.contribution.forEach(item => {
            totalContribution += item.amount;
        });
        return totalContribution;
    }
}
