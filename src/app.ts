// DOM Elements
import { DomElements } from "./dom/DomElements.js"
const { $form, $type, $from, $details, $amount, $newUserInput, $newUserBTN, $cards, $to } = DomElements;
// Classes Imports
import { Buyings } from "./classes/Buyings.js";
import { Payment } from "./classes/Payment.js";
import { Users } from "./classes/Users.js";
import { Card } from "./classes/CardTemplate.js";
// Interfaces Imports
import { MovementFormatter } from "./interfaces/MovementFormatter.js";
import { UserFormatter } from "./interfaces/UserFormatter.js";

const users: UserFormatter[] = [new Users('me')];

let totalPurchases: number = 0;
let each: number;

const renderUsersCards = () => {

    let HTMLTemplate: string = '';

    users.forEach(user => {
        HTMLTemplate += 
        `   <li class="card">
            <p class="user-name">${user.name}</p>
            <div class="user-info">
                <p>Contribution $ <span class="contribution">${user.totalContribution()}</span></p>
                <p>Debe $ <span class="debe"></span>${user.debe}</p>
                <p>Le deben $ <span class="le-deben">${user.leDeben}</span></p>
            </div>
            <li>
        `
    })
    
    $cards.innerHTML = HTMLTemplate;        
}
const setDebts = (user: UserFormatter) => {
    let totalContribution: number = user.totalContribution();
    // each = totalPurchases/users.length

    if(totalContribution > each) {
        user.leDeben = totalContribution-each;
        user.debe = 0;
    } else {
        user.debe = each-totalContribution;
        user.leDeben = 0;
    }
}
const calcTotalPurchases = (a?:number) => {
    totalPurchases = 0;
    for (let index = 0; index < users.length; index++) {
        totalPurchases += users[index].totalContribution()
    }
    if(a) {totalPurchases += a}
    each = totalPurchases/users.length
    console.log({totalPurchases, each})
}

$newUserBTN.addEventListener('click', (e: Event) => {
    if($newUserInput.value !== "") {
        let user = new Users($newUserInput.value)
        users.push(user)

        calcTotalPurchases()
        users.forEach(user => setDebts(user))

        let newUserOption = document.createElement("option");
        newUserOption.innerText = $newUserInput.value;
        $from.appendChild(newUserOption)

        renderUsersCards()
    }
})

$type.addEventListener('change', () => $type.value === "buys" ? $to.disabled = true : $to.disabled = false)

const movements: MovementFormatter[] = [];
const payments: MovementFormatter[] = [];

let totalMovements: number = 0;


$form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    let doc: MovementFormatter;
    let values: [string, string, number ] = [$from.value, $details.value, $amount.valueAsNumber];

    if($type.value === "buys") {
        doc = new Buyings(...values);
        movements.push(doc);

        // totalPurchases += $amount.valueAsNumber
        calcTotalPurchases($amount.valueAsNumber)
        
        users.forEach(user => {
            if($from.value === user.name) {
                user.contribution.push({detail: $details.value, amount: $amount.valueAsNumber});
            };
            setDebts(user)
        });
    } else {
        doc = new Payment(...values);
        payments.push(doc);

        // totalPurchases -= $amount.valueAsNumber
        users.forEach(user => {
            if(user.name === $from.value) {
                user.debe -= $amount.valueAsNumber;
                user.contribution.push({detail: $details.value, amount: $amount.valueAsNumber})
            }
            if(user.name === $to.value) {
                user.leDeben -= $amount.valueAsNumber;
                user.contribution.push({detail: $details.value, amount: -$amount.valueAsNumber})
            }

        })
        calcTotalPurchases()
    }

    let lastMovement: number = movements.length - 1;
    totalMovements += movements[lastMovement].amount;

    
    renderUsersCards()
    console.log(users)

})
