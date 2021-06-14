export interface UserFormatter {
    name: string,
    buyings: number,
    payments?: {name:string, amount:number}[],
    // totalBuyings(): number
}