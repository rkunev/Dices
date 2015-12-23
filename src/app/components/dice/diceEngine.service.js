( function() {
    'use strict';

    angular
        .module( 'dices' )
        .factory( 'diceEngine', diceEngine );

    /** @ngInject */
    function diceEngine( gameRules ) {
        var rolledTimes = 0;
        var service = {
            rollDice: rollDice,
            canRoll: canRoll,
            incrementRollCounter: incrementRollCounter,
            resetRollCounter: resetRollCounter,
            rolledTimes: rolledTimes
        };

        return service;

        /**
         * Generates a random number between 1 and 6
         *
         * @return {Integer} The rolled dice.
         */
        function rollDice() {
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
            return ( this.rolledTimes < gameRules.MAX_ROLLS );
        }

        /**
         * Update roll counter when the dice are thrown.
         */
        function incrementRollCounter() {
            this.rolledTimes++;
        }

        /**
         * Reset roll counter
         */
        function resetRollCounter() {
            this.rolledTimes = 0;
        }
    }
} )();
