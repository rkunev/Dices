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
            scope: {
                roll: '='
            },
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function DiceController( $scope, diceEngine, gameRules ) {
            var vm = this;

            vm.canRoll = true;
            vm.dice = [];
            vm.roll = vm.dice;
            vm.rollDice = rollDice;

            activate();

            function activate() {
                getInitialDiceValues();
                diceEngine.resetRollCounter();
            }

            $scope.$on( 'dices.saveResult', function() {
                diceEngine.resetRollCounter();
                //* Unlock button */
                vm.canRoll = diceEngine.canRoll();

                //* Clear dices */
                vm.dice.forEach( function( die ) {
                    die.isLocked = false;
                } );

                //* Roll'em again */
                rollDice();
            } );

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

                $scope.$emit( 'dices.roll', rollResult );
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
        }
    }
} )();
