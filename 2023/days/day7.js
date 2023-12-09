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
    switch (true) {
        case isFiveOfAKind():
            return "5oak";
        case isFourOfAKind():
            return "4oak";
        case isFullHouse():
            return "fh";
        case isThreeOfAKind():
            return "3oak";
        case isTwoPairs():
            return "2p";
        case isOnePair():
            return "1p";
        default:
            return "hc";
    }
};
function parseHandFromCards(hand) {
    const kind = determineHandType(hand);
    const kindWeight = SCORE_KIND_STRENGTHS.length -
        SCORE_KIND_STRENGTHS.indexOf(kind);
    return {
        kind,
        kindWeight,
        hand,
        handWeight: hand.map((card) => {
            const index = CARD_STRENGTHS.indexOf(card);
            return CARD_STRENGTHS.length - index;
        }),
    };
}
function determineWinner(a, b) {
    let winner = null;
    if (a.kindWeight > b.kindWeight) {
        return a;
    }
    else if (b.kindWeight > a.kindWeight) {
        return b;
    }
    for (let i = 0; i < a.handWeight.length; i++) {
        if (winner) {
            return winner;
        }
        const aWeight = a.handWeight[i];
        const bWeight = b.handWeight[i];
        if (aWeight > bWeight) {
            return a;
        }
        else if (bWeight > aWeight) {
            return b;
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
        hand: parseHandFromCards(player.cards),
        bet: player.bet,
    }));
    hands.sort((a, b) => {
        const winner = determineWinner(a.hand, b.hand);
        if (winner === a.hand) {
            return 1;
        }
        if (winner === b.hand) {
            return -1;
        }
        return 0;
    });
    return hands.reduce((acc, item, index) => item.bet * (index + 1) + acc, 0);
}
const CARD_STRENGTHS_PART_2 = [
    "A",
    "K",
    "Q",
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
    "J",
];
function determineHandTypePart2(hand) {
    if (hand.every((v) => v === "J")) {
        return "5oak";
    }
    const jokerInstances = hand.reduce((acc, item, index) => {
        if (item === "J") {
            acc.push(index);
        }
        return acc;
    }, []);
    if (jokerInstances.length === 0) {
        return determineHandType(hand);
    }
    else {
        const characterWithMostInstances = hand
            .filter((v) => v !== "J")
            .toSorted((a, b) => {
            const aLen = hand.filter((v) => v === a).length;
            const bLen = hand.filter((v) => v === b).length;
            if (aLen > bLen) {
                return -1;
            }
            else if (bLen > aLen) {
                return 1;
            }
            return 0;
        })[0];
        const bestPossibleHand = [...hand];
        jokerInstances.forEach((index) => {
            bestPossibleHand[index] = characterWithMostInstances;
        });
        return determineHandType(bestPossibleHand);
    }
}
function parseHandFromCardsPart2(hand) {
    const kind = determineHandTypePart2(hand);
    const kindWeight = SCORE_KIND_STRENGTHS.length -
        SCORE_KIND_STRENGTHS.indexOf(kind);
    return {
        kind,
        kindWeight,
        hand,
        handWeight: hand.map((card) => {
            const index = CARD_STRENGTHS_PART_2.indexOf(card);
            return CARD_STRENGTHS_PART_2.length - index;
        }),
    };
}
function part2() {
    const hands = players.map((player) => ({
        hand: parseHandFromCardsPart2(player.cards),
        bet: player.bet,
    }));
    hands.sort((a, b) => {
        const winner = determineWinner(a.hand, b.hand);
        if (winner === a.hand) {
            return 1;
        }
        if (winner === b.hand) {
            return -1;
        }
        return 0;
    });
    return hands.reduce((acc, item, index) => item.bet * (index + 1) + acc, 0);
}
console.log({
    part1: part1(),
    part2: part2(),
});
