// DOM Elements
import { DomElements } from "./dom/DomElements.js";
const { $form, $type, $from, $details, $amount, $newUserInput, $newUserBTN, $cards, $to } = DomElements;
// Classes Imports
import { Buyings } from "./classes/Buyings.js";
import { Payment } from "./classes/Payment.js";
import { Users } from "./classes/Users.js";
const users = [new Users('me')];
let totalPurchases = 0;
let each;
const renderUsersCards = () => {
    let HTMLTemplate = '';
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
        `;
    });
    $cards.innerHTML = HTMLTemplate;
};
const setDebts = (user) => {
    let totalContribution = user.totalContribution();
    each = totalPurchases / users.length;
    if (totalContribution > each) {
        user.leDeben = totalContribution - each;
        user.debe = 0;
    }
    else {
        user.debe = each - totalContribution;
        user.leDeben = 0;
    }
};
$newUserBTN.addEventListener('click', (e) => {
    if ($newUserInput.value !== "") {
        let user = new Users($newUserInput.value);
        users.push(user);
        users.forEach(user => setDebts(user));
        let createUser = document.createElement("option");
        createUser.innerText = $newUserInput.value;
        $from.appendChild(createUser);
        renderUsersCards();
        // let card = new Card($newUserInput.value, 0, 0, 0);
        // $cards.appendChild(card.render())
        console.log(users);
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
        users.forEach(user => {
            if ($from.value === user.name) {
                user.contribution.push({ detail: $details.value, amount: $amount.valueAsNumber });
            }
            ;
            setDebts(user);
        });
    }
    else {
        doc = new Payment(...values);
        payments.push(doc);
    }
    let lastMovement = movements.length - 1;
    totalMovements += movements[lastMovement].amount;
    renderUsersCards();
    console.log(users);
});
