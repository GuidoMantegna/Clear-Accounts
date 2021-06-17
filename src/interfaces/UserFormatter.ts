type PaymentsFormatter = {
    detail: string,
    amount: number,
}

export interface UserFormatter {
    name: string,
    debe: number,
    leDeben: number,
    contribution: PaymentsFormatter[],
    totalContribution(): number,
}