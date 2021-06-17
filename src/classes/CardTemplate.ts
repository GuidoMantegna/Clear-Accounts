
export class Card {
    constructor(
        public name: string,
        public contribution?: number,
        public leDeben?: number,
        public debe?: number,
    ) {}

    render(){
        let HTMLTemplate = 
        `   <p class="user-name">${this.name}</p>
            <div class="user-info">
                <p>Contribution $ <span class="contribution">${this.contribution}</span></p>
                <p>Debe $ <span class="debe"></span>${this.debe}</p>
                <p>Le deben $ <span class="le-deben">${this.leDeben}</span></p>
            </div>
        `;

        let newListItem = document.createElement('li');
        newListItem.classList.add('card')
        newListItem.innerHTML = HTMLTemplate;

        return newListItem
    }

}