// DOM Elements
import { DomElements } from "./dom/DomElements.js"
const { $form, $type, $from, $details, $amount, $newUserInput, $newUserBTN, $cards, $to, $inputs, $formSelects } = DomElements;
// Classes Imports
import { Movements } from "./classes/Movement.js";
import { Users } from "./classes/Users.js";
// Interfaces Imports
import { UserFormatter } from "./interfaces/UserFormatter.js";

const users: UserFormatter[] = [new Users('Me')];
console.log(users)
let totalPurchases: number = 0;
let each: number;

const renderUsersCards: () => void = () => {

    let HTMLTemplate: string = '';

    users.forEach(user => {
        HTMLTemplate += 
        `   <li class="card">
            <p class="user-name">${user.name}</p>
            <div class="user-info">
                <p>Contribution $ <span>${(user.totalContribution()).toFixed(2)}</span></p>
                <p>Owes $ <span>${(user.debe).toFixed(2)}</span></p>
                <p>Is owed $ <span>${(user.leDeben).toFixed(2)}</span></p>
            </div>
            <li>
        `
    })
    
    $cards.innerHTML = HTMLTemplate;        
}
const setDebts: Function = (user: UserFormatter) => {
    let totalContribution: number = user.totalContribution();

    if(totalContribution > each) {
        user.leDeben = totalContribution-each;
        user.debe = 0;
    } else {
        user.debe = each-totalContribution;
        user.leDeben = 0;
    }
}
const calcTotalPurchases: Function = (a?:number) => {
    totalPurchases = 0;
    for (let index = 0; index < users.length; index++) {
        totalPurchases += users[index].totalContribution()
    }
    if(a) {totalPurchases += a}
    each = totalPurchases/users.length
}
const addNewUserOption: Function = (userName: string) => {
    let fromOption = document.createElement("option");
        fromOption.innerText = userName;
        $from.appendChild(fromOption);

    let toOption = document.createElement("option");
        toOption.innerText = userName;
        $to.appendChild(toOption);
}
const setReturns: Function = () => {
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
}

$newUserBTN.addEventListener('click', (e: Event) => {
    if($newUserInput.value !== "") {
        let user = new Users($newUserInput.value);
        users.push(user);
        addNewUserOption($newUserInput.value)
        $newUserInput.value = '';

        calcTotalPurchases()
        users.forEach(user => setDebts(user))

        renderUsersCards()
    }
})

$formSelects.forEach(select => select.addEventListener('change', (e: Event) => {    
    if (e.target === $type) {
        $type.value === "buys" ? $to.disabled = true : $to.disabled = false    
    } else {
        if($from.value !== $to.value) {
            $from.classList.remove('error-select');
            $to.classList.remove('error-select');
        }
    }
}))

$form.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    let values: [string, string, number, string ] = [$from.value, $details.value, $amount.valueAsNumber, $to.value];

    if($type.value === "buys") {
        calcTotalPurchases($amount.valueAsNumber)
        
        users.forEach(user => {
            if($from.value === user.name) {
                user.contribution.push({detail: $details.value, amount: $amount.valueAsNumber});
            };
            setDebts(user)
        });

        let movement = new Movements(...values);
        movement.render("buys");

        $inputs.forEach(input => input.value = "")

    } else {
        if($from.value !== $to.value) {
            setReturns() 

            let movement = new Movements(...values);
            movement.render("return");
    
            calcTotalPurchases();

            $inputs.forEach(input => input.value = "")
        }
        else {
            $from.classList.add('error-select');
            $to.classList.add('error-select');
        }
    }
    
    renderUsersCards()
})
