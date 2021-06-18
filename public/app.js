// DOM Elements
import { DomElements } from "./dom/DomElements.js";
const { $form, $type, $from, $details, $amount, $newUserInput, $newUserBTN, $cards, $to, $movements } = DomElements;
// Classes Imports
import { Movements } from "./classes/Movement.js";
import { Users } from "./classes/Users.js";
const users = [new Users('Me')];
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
    if (totalContribution > each) {
        user.leDeben = totalContribution - each;
        user.debe = 0;
    }
    else {
        user.debe = each - totalContribution;
        user.leDeben = 0;
    }
};
const calcTotalPurchases = (a) => {
    totalPurchases = 0;
    for (let index = 0; index < users.length; index++) {
        totalPurchases += users[index].totalContribution();
    }
    if (a) {
        totalPurchases += a;
    }
    each = totalPurchases / users.length;
};
const addNewUserOption = (userName) => {
    let fromOption = document.createElement("option");
    fromOption.innerText = userName;
    $from.appendChild(fromOption);
    let toOption = document.createElement("option");
    toOption.innerText = userName;
    $to.appendChild(toOption);
};
const setReturns = () => {
    users.forEach(user => {
        if (user.name === $from.value) {
            user.debe -= $amount.valueAsNumber;
            user.contribution.push({ detail: $details.value, amount: $amount.valueAsNumber });
        }
        if (user.name === $to.value) {
            user.leDeben -= $amount.valueAsNumber;
            user.contribution.push({ detail: $details.value, amount: -$amount.valueAsNumber });
        }
    });
};
$newUserBTN.addEventListener('click', (e) => {
    if ($newUserInput.value !== "") {
        let user = new Users($newUserInput.value);
        users.push(user);
        addNewUserOption($newUserInput.value);
        $newUserInput.value = '';
        calcTotalPurchases();
        users.forEach(user => setDebts(user));
        renderUsersCards();
    }
});
$type.addEventListener('change', () => $type.value === "buys" ? $to.disabled = true : $to.disabled = false);
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    let values = [$from.value, $details.value, $amount.valueAsNumber, $to.value];
    if ($type.value === "buys") {
        calcTotalPurchases($amount.valueAsNumber);
        users.forEach(user => {
            if ($from.value === user.name) {
                user.contribution.push({ detail: $details.value, amount: $amount.valueAsNumber });
            }
            ;
            setDebts(user);
        });
        let movement = new Movements(...values);
        movement.render("buys");
    }
    else {
        if ($from.value !== $to.value && $amount.value !== null) {
            setReturns();
            let movement = new Movements(...values);
            movement.render("return");
            calcTotalPurchases();
            $from.style.backgroundColor = "rgb(245, 245, 245)";
            $to.style.backgroundColor = "rgb(245, 245, 245)";
        }
        else {
            $from.style.backgroundColor = "tomato";
            $to.style.backgroundColor = "tomato";
        }
    }
    renderUsersCards();
});
