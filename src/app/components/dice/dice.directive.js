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
        function DiceController( $scope, $ngRedux, diceEngine, gameRules ) {
            var vm = this;

            vm.canRoll = true;
            vm.dice = [];
            vm.rollDice = rollDice;

            activate();

            function activate() {
                getInitialDiceValues();
                diceEngine.resetRollCounter();
            }

            // var unsubscribe = $ngRedux.subscribe( function() {
            //     var state = $ngRedux.getState();

            //     if ( state.diceRoll.saveResult ) {
            //         console.log( 'enable roll again' );
            //         //* Unlock button */
            //         diceEngine.resetRollCounter();
            //         vm.canRoll = diceEngine.canRoll();

            //         //* Clear dices */
            //         vm.dice.forEach( function( die ) {
            //             die.isLocked = false;
            //         } );

            //         //* Roll'em again */
            //         rollDice();
            //     }
            // } );
            // $scope.$on( '$destroy', unsubscribe );

            $scope.$on( 'dices.saveResult', function() {
                //* Unlock button */
                diceEngine.resetRollCounter();
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

                // $ngRedux.dispatch( {
                //     type: 'DICE_ROLL',
                //     rollResult: rollResult
                // } );
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
