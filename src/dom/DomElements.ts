export const DomElements = {
    // New Uers Form
    $newUserInput : document.querySelector('.add-friend > input') as HTMLInputElement,
    $newUserBTN : document.querySelector('.add-friend > button') as HTMLButtonElement,
    // Movements Form
    $form : document.querySelector('form')!,
    $type : document.querySelector('#type') as HTMLInputElement,
    $from : document.querySelector('#from') as HTMLInputElement,
    $to : document.querySelector('#to') as HTMLInputElement,
    $details : document.querySelector('#details') as HTMLInputElement,
    $amount : document.querySelector('#amount') as HTMLInputElement,
    // Cards
    $cards: document.querySelector('.cards') as HTMLUListElement,
    // Movements List
    $movements: document.querySelector('.movements') as HTMLUListElement,
    // All inputs/selects
    $inputs: document.querySelectorAll('input')!,
    $formSelects: document.querySelectorAll('form > select')!,
}