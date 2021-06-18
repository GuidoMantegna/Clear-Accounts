import { UserFormatter } from "../interfaces/UserFormatter.js"

type PaymentsFormatter = {
    detail: string,
    amount: number,
}

export class Users implements UserFormatter{
    constructor(
        public name: string,
        public debe: number = 0,
        public leDeben: number = 0,
        public contribution: PaymentsFormatter[] = [],
    ) {}

    totalContribution(){
        let totalContribution: number = 0;

        this.contribution.forEach(item => {
            totalContribution += item.amount
        })
        return totalContribution
    }
}
