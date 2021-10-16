import { makeAutoObservable } from 'mobx';

function CardsStore () {
    return makeAutoObservable({
        cards: [],
        totalCards: 0,
        startIndex: 0,
        updateCards(ar) {
            this.cards = ar;
        },
        setTotalCards(n) {
            this.totalCards = n;
        },
        setStartIndex(n) {
            this.startIndex = n;
        }
    })
}

const cardsStore = new CardsStore();
export default cardsStore;