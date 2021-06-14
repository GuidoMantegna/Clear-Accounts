// Classes Imports
import { Buyings } from "./classes/Buyings.js";
import { Payment } from "./classes/Payment.js";
import { Users } from "./classes/Users.js";
const form = document.querySelector('form');
// inputs
const type = document.querySelector('#type');
const from = document.querySelector('#from');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const newUserInput = document.querySelector('.add-friend > input');
const newUserBTN = document.querySelector('.add-friend > button');
const users = [new Users('me')];
newUserBTN.addEventListener('click', (e) => {
    if (newUserInput.value !== "") {
        let user = new Users(newUserInput.value);
        users.push(user);
        let createUser = document.createElement("option");
        createUser.innerText = newUserInput.value;
        from.appendChild(createUser);
    }
});
const movements = [];
const payments = [];
let totalMovements = 0;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    let values = [from.value, details.value, amount.valueAsNumber];
    if (type.value === "buys") {
        doc = new Buyings(...values);
        movements.push(doc);
        users.forEach(user => {
            if (from.value === user.name) {
                user.buyings += amount.valueAsNumber;
            }
        });
    }
    else {
        doc = new Payment(...values);
        payments.push(doc);
    }
    let lastMovement = movements.length - 1;
    totalMovements += movements[lastMovement].amount;
    console.log(users);
});
