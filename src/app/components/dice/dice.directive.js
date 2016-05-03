( function() {
    'use strict';

    angular
        .module( 'dices' )
        .directive( 'dice', diceDirective );

    /** @ngInject */
    function diceDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/dice/dice.html',
            controller: DiceController,
            controllerAs: 'vm',
            scope: {},
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function DiceController( $scope, $rootScope, diceService ) {
            var vm = this;

            vm.canRoll = true;
            vm.dice = [];
            vm.rollDice = rollDice;

            activate();

            function activate() {
                getInitialDiceValues();
                diceService.resetRollCounter();
            }

            // Events
            var unsubscribeFromSaveResult = $rootScope.$on( 'dices.saveResult', resultSaved );
            var unsubscribeFromGameOver = $rootScope.$on( 'dices.gameOver', gameOver );
            $scope.$on( '$destroy', cleanUpEvents );

            function cleanUpEvents() {
                unsubscribeFromSaveResult();
                unsubscribeFromGameOver();
            }

            function resultSaved() {

                // Unlock button
                diceService.resetRollCounter();
                vm.canRoll = diceService.canRoll();

                // Clear dices
                vm.dice.forEach( function( die ) {
                    die.isLocked = false;
                } );

                rollDice();
            }

            function rollDice() {
                var rollResult = [];

                vm.dice.forEach( function( die ) {
                    if ( !die.isLocked ) {
                        die.value = diceService.roll();
                    }

                    rollResult.push( die.value );
                } );

                diceService.incrementRollCounter();
                vm.canRoll = diceService.canRoll();

                $rootScope.$emit( 'dices.roll', rollResult );
            }

            // Populate initial dice values using gameRules. TODO: should be a model
            function getInitialDiceValues() {
                for ( var i = 1; i <= diceService.getDiceCount(); i++ ) {
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
