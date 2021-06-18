import { DomElements } from "../dom/DomElements.js";
import { MovementFormatter } from "../interfaces/MovementFormatter.js";

export class Movements implements MovementFormatter{
    constructor(
        public from: string,
        public details: string,
        public amount: number,
        public to?: string,
    ) {}

    render(type: string): void{
        if(type === 'buys') {
            let newItemList = document.createElement('li');
            newItemList.innerText = `${this.from} bought ${this.details} for $${this.amount}`;
            DomElements.$movements.appendChild(newItemList)
        } else {
            let newItemList = document.createElement('li');
            newItemList.innerText = `${this.from} return $${this.amount} to ${this.to} for ${this.details}`;
            DomElements.$movements.appendChild(newItemList)
        }
        
        let $noMovements = document.querySelector('.no-movements') as HTMLLIElement;
        $noMovements.style.display = 'none'
    }
}