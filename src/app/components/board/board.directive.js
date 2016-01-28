( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .directive( 'board', board );

    /** @ngInject */
    function board() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/board/board.html',
            controller: BoardController,
            controllerAs: 'vm',
            // If scope is not present, the unit tests will throw an error
            scope: {
                currentPlayer: '='
            },
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function BoardController( $scope, $rootScope, board, BoardModel ) {
            var vm = this;

            vm.boardTotal = 0;
            vm.boardResults = new BoardModel();
            vm.saveResult = saveResult;

            var unsubscribeFromRoll = $rootScope.$on( 'dices.roll', function( event, rollResult ) {
                angular.forEach( vm.boardResults, function( res ) {
                    if ( !res.isLocked ) {
                        res.value = board.calculateResult( rollResult, res.id );
                    }
                } );

                vm.boardTotal = board.sumResults( vm.boardResults );
            } );

            $scope.$on( '$destroy', cleanUpEvents );

            function cleanUpEvents() {
                unsubscribeFromRoll();
            }

            function saveResult( result ) {
                angular.forEach( vm.boardResults, function( res, i ) {
                    if ( res.id === result.id ) {
                        vm.boardResults[ i ].isLocked = true;
                    }
                } );

                $rootScope.$emit( 'dices.saveResult' )
            }
        }
    }
} )();
