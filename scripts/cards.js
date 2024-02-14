let suits = [ "Heart", "Spades", "Diamond", "Clubs"];
let values = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];

let deck = [];

suits.forEach( (suit) => {
    values.forEach( (value) => {
        deck.push( { suit: suit, value: value });
    })
})


function cardSwap(a, b) {
    let tmp = deck[a];
    deck[a] = deck[b];
    deck[b] = tmp;
}

for (let i=0; i<52*4; i++) {
    cardSwap(i%52, Math.floor(Math.random() * 52));
}

console.log(deck);
