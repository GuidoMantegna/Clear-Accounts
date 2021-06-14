// Classes Imports
import { Buyings } from "./classes/Buyings.js";
import { Payment } from "./classes/Payment.js";
import { Users } from "./classes/Users.js";
// Interfaces Imports
import { MovementFormatter } from "./interfaces/MovementFormatter.js";
import { UserFormatter } from "./interfaces/UserFormatter.js";

const form = document.querySelector('form')!;

// inputs
const type = document.querySelector('#type') as HTMLInputElement;
const from = document.querySelector('#from') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;
const newUserInput = document.querySelector('.add-friend > input') as HTMLInputElement;
const newUserBTN = document.querySelector('.add-friend > button') as HTMLButtonElement;

const users: UserFormatter[] = [new Users('me')];

newUserBTN.addEventListener('click', (e: Event) => {
    if(newUserInput.value !== "") {
        let user = new Users(newUserInput.value)
        users.push(user)

        let createUser = document.createElement("option");
        createUser.innerText = newUserInput.value;
        from.appendChild(createUser)
    }
})

const movements: MovementFormatter[] = [];
const payments: MovementFormatter[] = [];

let totalMovements: number = 0;

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    let doc: MovementFormatter;
    let values: [string, string, number ] = [from.value, details.value, amount.valueAsNumber];

    if(type.value === "buys") {
        doc = new Buyings(...values);
        movements.push(doc);

        users.forEach(user => {
            if(from.value === user.name) {
                user.buyings += amount.valueAsNumber
            }
        });
    } else {
        doc = new Payment(...values);
        payments.push(doc);
    }

    let lastMovement: number = movements.length - 1;
    totalMovements += movements[lastMovement].amount;

    console.log(users)

})
