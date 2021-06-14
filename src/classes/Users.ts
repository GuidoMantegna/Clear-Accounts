import { UserFormatter } from "../interfaces/UserFormatter.js"

type PaymentsFormatter = {
    name: string,
    amount: number,
}

export class Users implements UserFormatter{
    constructor(
        public name: string,
        public buyings: number = 0,
        public payments?: PaymentsFormatter[],
    ) {}

    // totalBuyings(){
    //     return this.buyings.reduce((acc, curr) => acc + curr)
    // }

    // totalPayments(){
    //     let sortPayments = this.payments.sort(function (a, b) {
    //         if (a.name > b.name) { return 1 }
    //         if (a.name < b.name) { return -1 }
    //         return 0;
    //       });

    //     let totalPayments: PaymentsFormatter[] = [sortPayments[0]];

    //     for (let index = 1; index < sortPayments.length; index++) {
    
    //             let currentItem = sortPayments[index]; 
    //             let lastItem = totalPayments[totalPayments.length - 1];
            
    //             if(currentItem.name === lastItem.name) {
    //                 lastItem.amount += currentItem.amount
    //             } else {
    //                 totalPayments.push(currentItem)
    //             }   
    //     }

    //     return totalPayments
    // }

}
