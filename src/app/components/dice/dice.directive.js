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
            // If scope is not present, the unit tests will throw an error
            scope: {},
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function DiceController( $scope, $rootScope, diceEngine, gameRules ) {
            var vm = this;

            vm.canRoll = true;
            vm.dice = [];
            vm.rollDice = rollDice;

            activate();

            function activate() {
                getInitialDiceValues();
                diceEngine.resetRollCounter();
            }

            //* Events */
            var unsubscribeFromSaveResult = $rootScope.$on( 'dices.saveResult', resultSaved );
            var unsubscribeFromGameOver = $rootScope.$on( 'dices.gameOver', gameOver );
            $scope.$on( '$destroy', cleanUpEvents );

            //* Unsubscribe from all events */
            function cleanUpEvents() {
                unsubscribeFromSaveResult();
                unsubscribeFromGameOver();
            }

            function resultSaved() {
                //* Unlock button */
                diceEngine.resetRollCounter();
                vm.canRoll = diceEngine.canRoll();

                //* Clear dices */
                vm.dice.forEach( function( die ) {
                    die.isLocked = false;
                } );

                //* Roll'em again */
                rollDice();
            }

            //* Roll all the dice */
            function rollDice() {
                var rollResult = [];

                vm.dice.forEach( function( die ) {
                    if ( !die.isLocked ) {
                        die.value = diceEngine.rollDice();
                    }

                    rollResult.push( die.value );
                } );

                diceEngine.incrementRollCounter();
                vm.canRoll = diceEngine.canRoll();

                $rootScope.$emit( 'dices.roll', rollResult );
            }

            //* Populate initial dice values using gameRules */
            function getInitialDiceValues() {
                for ( var i = 1; i <= gameRules.DICE_COUNT; i++ ) {
                    vm.dice.push( {
                        value: 0,
                        isLocked: false
                    } );
                }
            }

            function gameOver() {
                vm.canRoll = false;
            }
        }
    }
} )();
