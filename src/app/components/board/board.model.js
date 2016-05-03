( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .factory( 'BoardModel', BoardModel );

    /** @ngInject */
    function BoardModel() {
        return Board;

        function Board() {
            this.ones          = { id: 1, label: 'Ones', value: 0, isLocked: false };
            this.twos          = { id: 2, label: 'Twos', value: 0, isLocked: false };
            this.threes        = { id: 3, label: 'Threes', value: 0, isLocked: false };
            this.fours         = { id: 4, label: 'Fours', value: 0, isLocked: false };
            this.fives         = { id: 5, label: 'Fives', value: 0, isLocked: false };
            this.sixes         = { id: 6, label: 'Sixes', value: 0, isLocked: false };
            this.onePair       = { id: 7, label: '1 Pair', value: 0, isLocked: false };
            this.twoPairs      = { id: 8, label: '2 Pairs', value: 0, isLocked: false };
            this.threeOfAKind  = { id: 9, label: '3 of a Kind', value: 0, isLocked: false };
            this.fourOfAKind   = { id: 10, label: '4 of a Kind', value: 0, isLocked: false };
            this.smallStraight = { id: 11, label: 'Small Straight', value: 0, isLocked: false };
            this.largeStraight = { id: 12, label: 'Large Straight', value: 0, isLocked: false };
            this.fullHouse     = { id: 13, label: 'Full House', value: 0, isLocked: false };
            this.yatzy         = { id: 14, label: 'Yatzy', value: 0, isLocked: false };
            this.chance        = { id: 15, label: 'Chance', value: 0, isLocked: false };
        }
    }

} )();
