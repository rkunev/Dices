( function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'dice', dice );

    /** @ngInject */
    function dice() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/dice/dice.html',
            controller: DiceController,
            controllerAs: 'vm',
            scope: {}, // If scope is not present, the unit tests will throw an error
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function DiceController( diceEngine, gameRules ) {
            var vm = this;

            vm.canRoll = true;
            vm.dice = [];
            vm.rollDice = rollDice;

            activate();

            function activate() {
                getInitialDiceValues();
                diceEngine.resetRollCounter();
            }

            //* Roll all the dice */
            function rollDice() {
                vm.dice.forEach( function( dice, i ) {
                    vm.dice[ i ] = diceEngine.rollDice();
                } );

                diceEngine.incrementRollCounter();
                vm.canRoll = diceEngine.canRoll();
            }

            //* Populate initial dice values using gameRules */
            function getInitialDiceValues() {
                for ( var i = 1; i <= gameRules.diceCount; i++ ) {
                    vm.dice.push( i );
                }
            }
        }
    }
} )();
