( function() {
    'use strict';

    var diceCombinations = {
        'ONES':   { ID: 1, LABEL: 'Ones' },
        'TWOS':   { ID: 2, LABEL: 'Twos' },
        'THREES': { ID: 3, LABEL: 'Threes' },
        'FOURS':  { ID: 4, LABEL: 'Fours' },
        'FIVES':  { ID: 5, LABEL: 'Fives' },
        'SIXES':  { ID: 6, LABEL: 'Sixes' },
        'ONE_PAIR': { ID: 7, LABEL: '1 Pair' },
        'TWO_PAIRS': { ID: 8, LABEL: '2 Pairs' },
        'THREE_OF_A_KIND': { ID: 9, LABEL: '3 of a Kind' },
        'FOUR_OF_A_KIND': { ID: 10, LABEL: '4 of a Kind' },
        'SMALL_STRAIGHT': { ID: 11, LABEL: 'Small Straight' },
        'LARGE_STRAIGHT': { ID: 12, LABEL: 'Large Straight' },
        'FULL_HOUSE': { ID: 13, LABEL: 'Full House' },
        'YATZY': { ID: 14, LABEL: 'Yatzy' },
        'CHANCE': { ID: 15, LABEL: 'Chance' }
    };

    angular
        .module( 'dices.board' )
        .constant( 'diceCombinations', diceCombinations );
} )();
