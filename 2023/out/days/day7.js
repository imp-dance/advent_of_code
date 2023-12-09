import { getLines } from "../utils/utils.js";
const CARD_STRENGTHS = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
];
const SCORE_KIND_STRENGTHS = [
    "5oak",
    "4oak",
    "fh",
    "3oak",
    "2p",
    "1p",
    "hc",
];
const determineHandType = (hand) => {
    const cardCounts = CARD_STRENGTHS.map((strength) => hand.filter((card) => card === strength).length);
    function isFiveOfAKind() {
        return hand.every((card) => card === hand[0]);
    }
    function isFourOfAKind() {
        return cardCounts.includes(4);
    }
    function isFullHouse() {
        return cardCounts.includes(3) && cardCounts.includes(2);
    }
    function isThreeOfAKind() {
        return cardCounts.includes(3);
    }
    function isTwoPairs() {
        return cardCounts.filter((c) => c === 2).length === 2;
    }
    function isOnePair() {
        return cardCounts.filter((c) => c === 2).length === 1;
    }
    return isFiveOfAKind()
        ? "5oak"
        : isFourOfAKind()
            ? "4oak"
            : isFullHouse()
                ? "fh"
                : isThreeOfAKind()
                    ? "3oak"
                    : isTwoPairs()
                        ? "2p"
                        : isOnePair()
                            ? "1p"
                            : "hc";
};
const getCardWeight = (card) => {
    const index = CARD_STRENGTHS.indexOf(card);
    return CARD_STRENGTHS.length - index;
};
function toHand(hand) {
    const kind = determineHandType(hand);
    return {
        kind,
        weight: hand.map(getCardWeight),
        hand,
    };
}
function determineWinner(a, b) {
    let winner = null;
    for (let i = 0; i < a.weight.length || winner !== null; i++) {
        const aWeight = a.weight[i];
        const bWeight = b.weight[i];
        if (aWeight > bWeight) {
            winner = a;
        }
        else if (bWeight > aWeight) {
            winner = b;
        }
    }
    return winner;
}
const lines = getLines("./day7.input.txt");
const players = lines.map((line) => {
    const [cards, bet] = line.split(" ");
    return {
        cards: cards.split(""),
        bet: parseInt(bet),
    };
});
function part1() {
    const hands = players.map((player) => ({
        hand: toHand(player.cards),
        bet: player.bet,
    }));
    hands.sort((a, b) => {
        const winner = determineWinner(a.hand, b.hand);
        if (winner === a) {
            return 1;
        }
        if (winner === b) {
            return -1;
        }
        return 0;
    });
    return hands.reduce((acc, item, index) => acc + item.bet * (index + 1), 0);
}
console.log(part1());
