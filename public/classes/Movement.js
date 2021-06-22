import { DomElements } from "../dom/DomElements.js";
export class Movements {
    constructor(from, details, amount, to) {
        this.from = from;
        this.details = details;
        this.amount = amount;
        this.to = to;
    }
    render(type) {
        if (type === 'buys') {
            let newItemList = document.createElement('li');
            newItemList.innerText = `${this.from} bought ${this.details} for $${this.amount}`;
            DomElements.$movements.appendChild(newItemList);
        }
        else {
            let newItemList = document.createElement('li');
            newItemList.innerText = `${this.from} returns $${this.amount} to ${this.to} for ${this.details}`;
            DomElements.$movements.appendChild(newItemList);
        }
        let $noMovements = document.querySelector('.no-movements');
        $noMovements.style.display = 'none';
    }
}
