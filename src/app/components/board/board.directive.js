( function() {
    'use strict';

    angular
        .module( 'dices.board' )
        .directive( 'board', boardDirective );

    /** @ngInject */
    function boardDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/board/board.html',
            controller: BoardController,
            controllerAs: 'vm',
            scope: {
                currentPlayer: '='
            },
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function BoardController( $scope, $rootScope, $state, boardService, BoardModel, notificationService ) {
            var vm = this;

            vm.boardTotal = 0;
            vm.board = new BoardModel();
            vm.saveResult = saveResult;

            var unsubscribeFromRoll = $rootScope.$on( 'dices.roll', function( event, rollResult ) {
                // @todo: should be part of the BoardModel
                angular.forEach( vm.board, function( res ) {
                    if ( !res.isLocked ) {
                        res.value = boardService.calculateResult( rollResult, res.id );
                    }
                } );

                // @todo: should be part of the BoardModel
                vm.boardTotal = boardService.sumResults( vm.board );
            } );

            $scope.$on( '$destroy', unsubscribeFromRoll );

            function saveResult( row ) {
                vm.board = boardService.saveResult( row, vm.board );
                $rootScope.$emit( 'dices.saveResult' );

                if ( boardService.isGameOver( vm.board ) ) {
                    $rootScope.$emit( 'dices.gameOver' );

                    notificationService.showConfirm( {
                        title: 'Game is over',
                        textContent: 'Your result: ' + vm.boardTotal,
                        ok: 'New Game?',
                        cancel: 'Nah!'
                    } ).then( function() {
                        $state.forceReload();
                    } );
                }
            }
        }
    }
} )();
