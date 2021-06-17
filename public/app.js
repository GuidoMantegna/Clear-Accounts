// DOM Elements
import { DomElements } from "./dom/DomElements.js";
const { $form, $type, $from, $details, $amount, $newUserInput, $newUserBTN, $cards, $to } = DomElements;
// Classes Imports
import { Buyings } from "./classes/Buyings.js";
import { Payment } from "./classes/Payment.js";
import { Users } from "./classes/Users.js";
import { Card } from "./classes/CardTemplate.js";
const users = [new Users('me')];
let totalPurchases = 0;
let each;
// const renderUsersCards = (name: string, debe: number, leDeben: number) => {
//     let HTMLTemplate = 
//         `   <p class="user-name">${name}</p>
//             <div class="user-info">
//                 <p>Contribution $ <span class="contribution">${this.contribution}</span></p>
//                 <p>Debe $ <span class="debe"></span>${this.debe}</p>
//                 <p>Le deben $ <span class="le-deben">${this.leDeben}</span></p>
//             </div>
//         `;
//         let newListItem = document.createElement('li');
//         newListItem.classList.add('card')
//         newListItem.innerHTML = HTMLTemplate;
// }
$newUserBTN.addEventListener('click', (e) => {
    if ($newUserInput.value !== "") {
        let user = new Users($newUserInput.value);
        users.push(user);
        let createUser = document.createElement("option");
        createUser.innerText = $newUserInput.value;
        $from.appendChild(createUser);
        let card = new Card($newUserInput.value, 0, 0, 0);
        $cards.appendChild(card.render());
    }
});
$type.addEventListener('change', () => $type.value === "buys" ? $to.disabled = true : $to.disabled = false);
const movements = [];
const payments = [];
let totalMovements = 0;
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    let values = [$from.value, $details.value, $amount.valueAsNumber];
    if ($type.value === "buys") {
        doc = new Buyings(...values);
        movements.push(doc);
        totalPurchases += $amount.valueAsNumber;
        each = totalPurchases / users.length;
        users.forEach(user => {
            if ($from.value === user.name) {
                user.contribution.push({ detail: $details.value, amount: $amount.valueAsNumber });
                let totalContribution = user.totalContribution();
                if (totalContribution > each) {
                    user.leDeben = totalContribution - each;
                    user.debe = 0;
                }
                else {
                    user.debe = each - totalContribution;
                    user.leDeben = 0;
                }
            }
            else {
                let totalContribution = user.totalContribution();
                if (totalContribution > each) {
                    user.leDeben = totalContribution - each;
                    user.debe = 0;
                }
                else {
                    user.debe = each - totalContribution;
                    user.leDeben = 0;
                }
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
