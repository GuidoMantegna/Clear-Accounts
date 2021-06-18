export interface MovementFormatter {
    from: string,
    to?: string,
    details: string,
    amount: number,
    render(type: string): void,
}
