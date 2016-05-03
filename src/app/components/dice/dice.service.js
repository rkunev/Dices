( function() {
    'use strict';

    angular
        .module( 'dices' )
        .service( 'diceService', diceService );

    /** @ngInject */
    function diceService() {
        var rolledTimes = 0;

        // @todo: This should be a .config of the module
        var gameRules = {
            diceCount: 5,
            maxRolls: 3
        };

        this.roll = roll;
        this.canRoll = canRoll;
        this.incrementRollCounter = incrementRollCounter;
        this.resetRollCounter = resetRollCounter;
        this.getDiceCount = getDiceCount;

        function getDiceCount() {
            return gameRules.diceCount;
        }

        /**
         * Generates a random number between 1 and 6
         *
         * @return {Integer} The rolled dice.
         */
        function roll() {
            if ( this.canRoll() ) {
                return Math.floor( Math.random() * 6 ) + 1;
            }
        }

        /**
         * Check if the player can roll the dice
         *
         * @return {Boolean} True if rolledTimes counter is less than max roll count
         */
        function canRoll() {
            return ( rolledTimes < gameRules.maxRolls );
        }

        /**
         * Update roll counter when the dice are thrown.
         */
        function incrementRollCounter() {
            rolledTimes++;
        }

        /**
         * Reset roll counter
         */
        function resetRollCounter() {
            rolledTimes = 0;
        }
    }
} )();
