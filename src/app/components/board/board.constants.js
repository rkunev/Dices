( function() {
    'use strict';

    var diceCombinations = {
        'ONES':   { ID: 1, LABEL: '1x5' },
        'TWOS':   { ID: 2, LABEL: '2x5' },
        'THREES': { ID: 3, LABEL: '2x5' },
        'FOURS':  { ID: 4, LABEL: '4x5' },
        'FIVES':  { ID: 5, LABEL: '5x5' },
        'SIXES':  { ID: 6, LABEL: '6x5' }
    };

    angular
        .module( 'dices.board' )
        .constant( 'diceCombinations', diceCombinations );
} )();
